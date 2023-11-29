import React, { useState, useEffect } from "react";
import { SimpleGrid, Grid, GridItem } from "@chakra-ui/react";

import { Product, InventoryItem } from "../models";
import { ProductCard } from "./ProductCard";
import { ProductDetails } from "./ProductDetails";
import { useInventory } from "../hooks/useInventory";

export const Products = () => {
  const { inventory, add, remove } = useInventory();
  const [products, setProducts] = useState<Product[]>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  // listen to inventory changes to update the UI
  useEffect(() => {
    setProducts(Array.from(inventory.values()));
  }, [inventory]);

  const onProductClick = (itemId: string) => {
    const product = inventory.get(itemId);
    if (product) {
      setSelectedProduct(product);
      openDrawer();
    }
  };

  return (
    <Grid templateColumns="100%" maxW={"1600"} margin="0 auto">
      <GridItem height={"100vh"} maxH={"100vh"} overflowY="scroll">
        <SimpleGrid columns={3} spacing={2} p={10}>
          {products?.map((product) => (
            <ProductCard
              key={product.productId}
              onClick={onProductClick}
              product={product}
            />
          ))}
        </SimpleGrid>
      </GridItem>
      <GridItem>
        {isDrawerOpen && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            onClose={closeDrawer}
            onAdd={add}
            onRemove={remove}
          />
        )}
      </GridItem>
    </Grid>
  );
};

export default Products;
