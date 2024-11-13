from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from uuid import uuid4
from time import time
import pika  # Import pika for RabbitMQ

refills = APIRouter(prefix="/refill")

class BaseRefill(BaseModel):
    mat_id: str

class RefillUpdate(BaseModel):
    id: str
    status: int
    delivered_at: int

# Initialize a connection to RabbitMQ
def connect_rabbitmq():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    # Declare a queue for refill requests to ensure it exists
    channel.queue_declare(queue='refill_queue', durable=True)
    return connection, channel

@refills.get("/test")
async def test_refill():
    return {'message': "It works!"}

@refills.post("/create")
async def create_refill(ref: BaseRefill):
    # Insert the refill request into the database
    refill_request = {
        "id": uuid4().hex,
        "mat_id": ref.mat_id,
        "given_at": int(time() * 1000),
        "status": 0
    }
    await db.refills.insert_one(refill_request)

    # Connect to RabbitMQ and publish a message to the refill queue
    connection, channel = connect_rabbitmq()
    try:
        # Publish the refill request details to the queue
        channel.basic_publish(
            exchange='',
            routing_key='refill_queue',  # Queue name
            body=str(refill_request),    # Message payload
            properties=pika.BasicProperties(
                delivery_mode=2,         # Make message persistent
            )
        )
    finally:
        # Close the RabbitMQ connection to free up resources
        connection.close()

    return {"message": "Refill created successfully!"}

@refills.get("/list")
async def list_refills():
    ref_list = list(db.refills.find())
    for ref in ref_list:
        del ref["_id"]
    return {"refills": ref_list}

@refills.get("/get")
async def get_refill(id: str):
    refill = db.refills.find_one({"id": id})

    if refill is None:
        raise HTTPException(404, "Refill not found")
    
    del refill["_id"]
    return refill

@refills.patch("/update")
async def update_refill(ref: RefillUpdate):
    refill = db.refills.find_one({"id": ref.id})

    if refill is None:
        raise HTTPException(404, "Refill not found")

    db.refills.update_one(
        {"id": ref.id},
        {
            "$set": {
                "status": ref.status,
                "delivered_at": ref.delivered_at
            }
        }
    )
    return {"message": "Refill updated successfully!"}

@refills.delete("/delete")
async def delete_refill(id: str):
    refill = db.refills.find_one({"id": id})

    if refill is None:
        raise HTTPException(404, "Refill not found")

    db.refills.delete_one({"id": id})
    return {"message": "Deleted refill successfully!"}
