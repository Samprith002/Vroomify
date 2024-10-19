from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from db import db
from uuid import uuid4

models = APIRouter()

class Model(BaseModel):
  name: str
  year: int
  materials: dict
  price: int
  deliveryTime: int

class ModelWithID(Model):
  id: str

@models.get('/list')
async def list_models():
  model_list = list(db.models.find())
  for model in model_list:
    del model['_id']
  return { "models": model_list }


@models.post("/create")
async def create_model(model: Model):
  db.models.insert_one({
    'id': uuid4().hex,
    'name': model.name,
    'year': model.year,
    'materials': model.materials,
    'price': model.price,
    'deliveryTime': model.deliveryTime
  })
  return { 'message': f"Model '{model.name}' created successfully!" }


@models.get('/get')
async def get_model(id: str):
  material = db.models.find_one({ "id": id })
  
  if material is None:
    raise HTTPException(404, "Model not found")
  
  del material['_id']
  return material


@models.patch('/update')
async def update_model(model: ModelWithID):
  update_data = model.model_dump(exclude_unset=True)
  result = db.models.update_one(
    { 'id': model.id }, 
    { '$set': update_data }
  )

  if result.matched_count == 0:
    raise HTTPException(404, f"Model with ID '{model.id}' not found.")
  if result.modified_count == 0:
    return { "info": f"Model '{model.name}' already up to date." }

  return { 'message': f"Model '{model.id}' updated successfully!" }


@models.delete('/delete')
async def delete_model(id: str):
  db.models.delete_one({ "id": id })
  return { "message": f"Model with id '{id}' deleted successfully!" }