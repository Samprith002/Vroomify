from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from uuid import uuid4
from time import time

refills = APIRouter(prefix="/refill")


class BaseRefill(BaseModel):
  mat_id: str

class RefillUpdate(BaseModel):
  id: str
  status: int
  delivered_at: int


@refills.get("/test")
async def test_refill():
  return { 'message': "It works!" }


@refills.post("/create")
async def create_refill(ref: BaseRefill):
  db.refills.insert_one({
    "id": uuid4().hex,
    "mat_id": ref.mat_id,
    "given_at": int(time() * 1000),
    "status": 0
  })

  return { "message": "Refill created successfully!" }


@refills.get("/list")
async def list_refills():
  ref_list = list(db.refills.find())
  for ref in ref_list:
    del ref["_id"]
  return { "refills": ref_list }


@refills.get("/get")
async def get_refill(id: str):
  refill = db.refills.find_one({
    "id": id
  })

  if refill is None:
    raise HTTPException(404, "Refill not found")
  
  del refill["_id"]
  return refill


@refills.patch("/update")
async def update_refill(ref: RefillUpdate):
  refill = db.refills.find_one({
    "id": ref.id
  })

  if refill is None:
    raise HTTPException(404, "Refill not found")

  db.refill.update_one({
    "id": ref.id
  }, {
    "$set": {
      "status": ref.status,
      "delivered_at": ref.delivered_at
    }
  })
  return { "message": "Refill updated successfully!" }


@refills.delete("/delete")
async def delete_refill(id: str):
  refill = db.refills.find_one({
    "id": id
  })

  if refill is None:
    raise HTTPException(404, "Refill not found")

  db.refills.delete_one({
    "id": id
  })
  return { "message": "Deleted refill successfully!" }