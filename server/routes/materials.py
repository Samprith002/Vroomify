from fastapi import APIRouter
from pydantic import BaseModel
from db import db
from uuid import uuid4

materials = APIRouter()

class Material(BaseModel):
  name: str
  maxQty: int
  price: int
  deliveryTime: int

class MaterialWithID(Material):
  id: str

@materials.get('/list')
async def list_materials():
  materials = list(db.materials.find())
  for material in materials:
    del material['_id']
  return { "materials": materials }


@materials.post("/create")
async def create_material(material: Material):
  db.materials.insert_one({
    'id': uuid4().hex,
    'name': material.name,
    'maxQty': material.maxQty,
    'price': material.price,
    'deliveryTime': material.deliveryTime
  })
  return { 'message': f"Material {material.name} created successfully!" }


@materials.get('/get')
async def get_material(id: str):
  material = db.materials.find_one({ "id": id })
  
  if material is None:
    return { "error": "Material not found" }
  
  del material['_id']
  return material


@materials.patch('/update')
async def update_material(material: MaterialWithID):
  update_data = material.model_dump(exclude_unset=True)
  result = db.materials.update_one(
      { 'id': material.id }, 
      { '$set': update_data }
  )

  if result.matched_count == 0:
      return { 'error': f"Material '{material.name}' not found." }
  if result.modified_count == 0:
      return { 'message': f"Material '{material.name}' already up to date." }

  return { 'message': f"Material '{material.name}' updated successfully!" }


@materials.delete('/delete')
async def delete_material(id: str):
  db.materials.delete_one({ "id": id })
  return { "message": f"Material with id '{id}' deleted successfully!" }