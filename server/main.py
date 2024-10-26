from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.materials import materials
from routes.models import models
from routes.inventory import inventory

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(materials, prefix='/material')
app.include_router(models, prefix="/model")
app.include_router(inventory, prefix="/inventory")

@app.get('/')
async def main():
  return { "message": "Hello World!!" }
