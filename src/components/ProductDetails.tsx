import {
  Box,
  Stack,
  Divider,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react";
import { ProductInfo } from "./ProductInfo";
import { Product, InventoryItem, OPERATION } from "../models";
import { InventoryTable } from "./InventoryTable";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { useState } from "react";
import { InventoryForm } from "./InventoryForm";
import { OperationReturnType } from "../hooks/useInventory";
import { OnSubmitReturnType } from "./ConfirmationDialog";

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onAdd: (
    productId: string,
    inventoryItem: InventoryItem
  ) => OperationReturnType;
  onRemove: (productId: string, quantity: number) => OperationReturnType;
}
export const ProductDetails = ({
  product,
  onClose,
  onAdd,
  onRemove
}: ProductDetailsProps) => {
  const [result, setResult] = useState<OnSubmitReturnType>({
    cost: 0,
    quantity: 0,
    showConfirmation: false,
    operation: OPERATION.ADD,
    groups: new Map<string, number>()
  });

  const handleClose = () => {
    setResult({
      cost: 0,
      quantity: 0,
      showConfirmation: false,
      operation: OPERATION.REMOVE,
      groups: new Map<string, number>()
    });
    onClose();
  };

  return (
    <Drawer placement={"right"} onClose={onClose} isOpen size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody bg={"gray.100"}>
          <Box h={"100vh"} p={10} maxH={"100vh"} overflowY="scroll">
            {result.showConfirmation && (
              <ConfirmationDialog result={result} onClose={handleClose} />
            )}
            <Box borderRadius={"md"}>
              <Stack p={10}>
                <ProductInfo product={product} />
                <InventoryForm
                  onAdd={onAdd}
                  product={product}
                  onRemove={onRemove}
                  setResult={setResult}
                />
                {product.inventoryItems && (
                  <InventoryTable items={product.inventoryItems.getAll()} />
                )}
                <Divider my={4} />
              </Stack>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
