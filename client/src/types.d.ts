export interface Material {
  id: string;
  name: string;
  maxQty: number;
  price: number;
  deliveryTime: number;
}

export interface Model {
  id: string;
  name: string;
  year: number;
  materials: Record<string, number>
  price: number;
  deliveryTime: number;
}

export interface InventoryPair {
  key: string;
  value: string;
}