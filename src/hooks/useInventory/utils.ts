import { faker } from "@faker-js/faker";
import { Product, InventoryItem } from "../../models";
import { Queue } from "../../models";

// utility function to generate mock our store using faker
export const mockStore = (numberOfProducts: number): Product[] => {
  const products: Product[] = [];

  for (let i = 0; i < numberOfProducts; i++) {
    const productId = faker.string.nanoid();

    // mock inventory items first
    const inventoryItems: InventoryItem[] = [];

    for (let j = 0; j < 10; j++) {
      const inventoryItemId = faker.string.uuid();
      const inventoryItem: InventoryItem = {
        inventoryItemId,
        productId,
        receivedDate: faker.date.past(1),
        purchasePrice: parseFloat(faker.commerce.price()),
        quantity: j + 1 + Math.floor(Math.random()),
        status: "available",
      };
      inventoryItems.push(inventoryItem);
    }
    // sort items first based on date
    inventoryItems.sort(sortItems);
    const queue = new Queue<InventoryItem>();
    inventoryItems.forEach((item) => {
      queue.enqueue(item);
    });

    // Create mock product
    const product: Product = {
      productId,
      productName: faker.commerce.productName(),
      categoryId: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      brand: faker.company.name(),
      images: [faker.image.url()],
      inventoryItems: queue,
    };

    products.push(product);
  }
  return products;
};

// utility function to sort based on date
export const sortItems = (a: InventoryItem, b: InventoryItem) =>
  a.receivedDate.getTime() - b.receivedDate.getTime();

// Sum all inventory items for a given product
export const sumQuantitiesInProduct = (product: Product): number => {
  let totalQuantity = 0;

  const items = product.inventoryItems.getAll();

  items.forEach((item) => {
    totalQuantity += item.quantity;
  });

  return totalQuantity;
};
