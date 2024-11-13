import pika
from pymongo import MongoClient
import json

# MongoDB setup (adjust connection details as needed)
client = MongoClient('mongodb://localhost:27017/')
db = client.your_database_name  # Replace with your actual database name

# Connect to RabbitMQ and declare the queues
def connect_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    # Declare the order and refill queues
    channel.queue_declare(queue='order_queue', durable=True)
    channel.queue_declare(queue='refill_queue', durable=True)
    return connection, channel

# Check inventory function
def check_inventory(mod_id):
    # Query the inventory for the required material ID
    inventory_item = db.inventory.find_one({"mod_id": mod_id})
    if inventory_item and inventory_item.get("quantity", 0) > 0:
        return True
    return False

# Publish a message to the refill queue
def request_refill(channel, mod_id):
    refill_request = {
        "id": uuid4().hex,
        "mat_id": mod_id,
        "given_at": int(time() * 1000),
        "status": 0
    }
    channel.basic_publish(
        exchange='',
        routing_key='refill_queue',
        body=json.dumps(refill_request),
        properties=pika.BasicProperties(
            delivery_mode=2,  # Make message persistent
        )
    )
    print(f"Refill request for material {mod_id} sent to refill_queue.")

# Process each order message from RabbitMQ
def process_order(ch, method, properties, body):
    # Decode the message
    order = json.loads(body.decode())
    mod_id = order['mod_id']
    order_id = order['id']

    # Check if there is enough material in inventory
    if check_inventory(mod_id):
        # Update order status to 'fulfilled' (status = 1)
        db.orders.update_one({"id": order_id}, {"$set": {"status": 1}})
        print(f"Order {order_id} fulfilled.")
        
        # Optionally, decrement inventory quantity
        db.inventory.update_one({"mod_id": mod_id}, {"$inc": {"quantity": -1}})
    else:
        # Update order status to 'on hold' (status = 2) and request a refill
        db.orders.update_one({"id": order_id}, {"$set": {"status": 2}})
        print(f"Order {order_id} on hold due to insufficient inventory.")
        
        # Request a refill for the insufficient material
        request_refill(ch, mod_id)

    # Acknowledge the message
    ch.basic_ack(delivery_tag=method.delivery_tag)

# Main function to start consuming
def start_consumer():
    connection, channel = connect_rabbitmq()
    channel.basic_qos(prefetch_count=1)  # Process one message at a time
    channel.basic_consume(queue='order_queue', on_message_callback=process_order)

    print("Waiting for messages in order_queue. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    start_consumer()
