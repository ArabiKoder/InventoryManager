import { useState, useEffect } from "react";
import { InventoryItem, OPERATION, Product } from "../../models";
import { mockStore } from "./utils";

export interface OperationReturnType {
  quantity: number;
  cost: number;
  operation: OPERATION;
  groups: Map<string, number>;
}

// custom hook to manage our Inventory simulating a FIFO queue
export const useInventory = () => {
  const [inventory, setInventory] = useState<Map<string, Product>>(new Map());

  const addProduct = (product: Product) => {
    setInventory((prev) => new Map(prev).set(product.productId, product));
  };

  const add = (productId: string, item: InventoryItem): OperationReturnType => {
    const product = inventory.get(productId);
    const updated = new Map(inventory);
    if (product) {
      product.inventoryItems.enqueue(item);

      const updatedProduct: Product = {
        ...product
      };
      updated.set(productId, updatedProduct);
      setInventory(updated);
    }
    return {
      quantity: item.quantity,
      cost: item.quantity * item.purchasePrice,
      operation: OPERATION.ADD,
      groups: new Map([[item.purchasePrice.toString(), item.quantity]])
    };
  };

  const remove = (
    productId: string,
    quantityToRemove: number
  ): OperationReturnType => {
    let totalCost = 0;
    let removedItems = 0;
    const groups = new Map<string, number>();
    const updated = new Map(inventory);

    // Check if the product exists in the inventory
    const product = inventory.get(productId);
    if (!product) {
      // Handle the case where the product does not exist
      // This could be returning an error or a special value
      return {
        quantity: 0,
        cost: 0,
        operation: OPERATION.REMOVE,
        groups: groups
      };
    }

    // Iterate over inventory items while there are items to remove
    while (quantityToRemove > 0 && product.inventoryItems.size() > 0) {
      const item = product.inventoryItems.peek();
      if (!item) {
        break;
      }

      const quantityAvailable = item.quantity;
      const quantityToDequeue = Math.min(quantityToRemove, quantityAvailable);

      // Update the removal quantities
      quantityToRemove -= quantityToDequeue;
      removedItems += quantityToDequeue;
      totalCost += quantityToDequeue * item.purchasePrice;

      // Update groups map with the removed quantity
      const priceAsString = item.purchasePrice.toString();
      const currentQuantity = groups.get(priceAsString) || 0;
      groups.set(priceAsString, currentQuantity + quantityToDequeue);

      if (quantityToDequeue >= quantityAvailable) {
        // Remove the entire batch from the queue
        product.inventoryItems.dequeue();
      } else {
        // Update the remaining quantity in the current batch
        item.quantity -= quantityToDequeue;
      }
      const updatedProduct: Product = {
        ...product
      };
      updated.set(productId, updatedProduct);
      setInventory(updated);
    }

    setInventory(inventory);

    return {
      quantity: removedItems,
      cost: totalCost,
      operation: OPERATION.REMOVE,
      groups: groups
    };
  };

  useEffect(() => {
    // Initialize the store
    const products = mockStore(9);
    products.forEach((p) => {
      addProduct(p);
    });
  }, []);

  return {
    inventory,
    addProduct,
    add,
    remove
  };
};
