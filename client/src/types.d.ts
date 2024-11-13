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

export interface Order {
  id: string;
  mod_id: string;
  given_at: string;
  delivered_at: number;
  status: number;
}

export interface Refill {
  id: string;
  mat_id: string;
  given_at: string;
  delivered_at: string;
  status: string;
  
}