from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from uuid import uuid4
from time import time
import pika  # Import pika for RabbitMQ

orders = APIRouter()

class BaseOrder(BaseModel):
    mod_id: str

class Order(BaseOrder):
    id: str
    given_at: str
    delivered_at: int
    status: int

class OrderUpdate(BaseModel):
    id: str
    status: int
    delivered_at: int

# Initialize a connection to RabbitMQ
def connect_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    # Declare a queue to ensure it exists
    channel.queue_declare(queue='order_queue', durable=True)
    return connection, channel

@orders.get("/list")
async def list_orders():
    orders_list = list(db.orders.find())
    for order in orders_list:
        del order["_id"]
    return {"orders": orders_list}

@orders.post("/create")
async def create_order(order: BaseOrder):
    # Create a new order in the database
    new_order = {
        'id': uuid4().hex,
        'mod_id': order.mod_id,
        'given_at': int(time() * 1000),
        'status': 0
    }
    db.orders.insert_one(new_order)
    
    # Connect to RabbitMQ and publish the message
    connection, channel = connect_rabbitmq()
    try:
        # Publish the order details as a message to the queue
        channel.basic_publish(
            exchange='',
            routing_key='order_queue',  # Queue name
            body=str(new_order),        # Message payload
            properties=pika.BasicProperties(
                delivery_mode=2,        # Make message persistent
            )
        )
    finally:
        # Always close the connection to avoid resource leaks
        connection.close()

    return {'message': 'Order created successfully!'}

@orders.get("/get")
async def get_order(id: str):
    order = db.orders.find_one({"id": id})

    if order is None:
        raise HTTPException(404, "Order not found")
    
    del order["_id"]
    return order

@orders.patch("/update")
async def update_order(ord: OrderUpdate):
    order = db.orders.find_one({"id": ord.id})

    if order is None:
        raise HTTPException(404, "Order not found")

    db.orders.update_one(
        {"id": ord.id},
        {
            "$set": {
                "status": ord.status,
                "delivered_at": ord.delivered_at
            }
        }
    )

    return {'message': "Order updated successfully!"}

@orders.delete("/delete")
async def delete_order(id: str):
    order = db.orders.find_one({"id": id})

    if order is None:
        raise HTTPException(404, "Order not found")

    db.orders.delete_one({"id": id})

    return {"message": "Order deleted successfully!"}
