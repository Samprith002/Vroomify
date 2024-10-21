import { Material, Model } from "@/types";
import axios from "axios";

export async function getMaterials() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/material/list`
  );
  return res.data.materials as Material[]
}

export async function getMaterial(id: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/material/get?id=${id}`
  );
  return res.data as Material
}

export async function addMaterial(mat: Omit<Material, "id">) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/material/create`,
    mat
  );
  return res.data
}

export async function updateMaterial(mat: Material) {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/material/update`,
    mat
  );
  return res.data
}

export async function deleteMaterial(id: string) {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/material/delete?id=${id}`)
  return res.data
}


export async function getModels() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/list`
  );
  return res.data.models as Model[]
}

export async function createModel(mod: Omit<Model, "id">) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/create`,
    mod
  );
  return res.data
}

export async function updateModel(mod: Model) {
  const res = await axios.patch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/model/update`,
    mod
  );
  return res.data
}

export async function deleteModel(id: string) {
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/model/delete?id=${id}`)
  return res.data
}