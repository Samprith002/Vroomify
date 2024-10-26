from fastapi import APIRouter
from pydantic import BaseModel
from db import db

inventory = APIRouter()

class Inventory(BaseModel):
  key: str
  value: int


@inventory.post('/create')
async def create_pair(inv: Inventory):
  db.inventory.insert_one({
    "key": inv.key,
    "value": inv.value
  })
  return { 'message': "Pair created successfully" }


@inventory.get('/get')
async def get_pair(key: str):
  pair = db.inventory.find_one({
    "key": key
  })

  if pair is None:
    return { "error": "Pair not found" }
  
  del pair["_id"]
  return pair


@inventory.get("/list")
async def list_pairs():
  pairs = list(db.inventory.find())

  for pair in pairs:
    del pair["_id"]

  return { "pairs": pairs }


@inventory.patch("/update")
async def update_pair(inv: Inventory):
  db.inventory.update_one({
    "key": inv.key
  }, { "$set": {
    "value": inv.value
  }})
  return { "message": "Pair updated successfully" }


@inventory.delete("/delete")
async def delete_pair(key: str):
  db.inventory.delete_one({
    "key": key
  })
  return { "message": "Pair deleted successfully" }