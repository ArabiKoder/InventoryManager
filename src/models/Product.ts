import { InventoryItem, Queue } from ".";

export interface Product {
  productId: string;
  productName: string;
  categoryId: string;
  description: string;
  price: number;
  brand: string;
  color?: string | string[];
  images: string[];
  inventoryItems: Queue<InventoryItem>;
}
