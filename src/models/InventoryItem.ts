export interface InventoryItem {
  inventoryItemId: string;
  productId: string;
  purchasePrice:number;
  quantity:number;
  receivedDate: Date;
  status: "available" | "reserved";
}
