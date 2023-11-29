import {
  Stack,
  FormLabel,
  FormControl,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from "@chakra-ui/react";
import { Product, InventoryItem } from "../models";
import { faker } from "@faker-js/faker";
import { useState, ChangeEvent } from "react";
import { sumQuantitiesInProduct } from "../hooks/useInventory/utils";
import { OperationReturnType } from "../hooks/useInventory";
import { OPERATION } from "../models/";
import { OnSubmitReturnType } from "./ConfirmationDialog";

interface InventoryFormProps {
  product: Product;
  onAdd: (
    productId: string,
    inventoryItem: InventoryItem
  ) => OperationReturnType;
  onRemove: (productId: string, quantity: number) => OperationReturnType;
  setResult: (result: OnSubmitReturnType) => void;
}

export const InventoryForm = ({
  product,
  onAdd,
  onRemove,
  setResult
}: InventoryFormProps) => {
  const [operation, setOperation] = useState(OPERATION.REMOVE);
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (
    quantityAsString: string,
    quantityAsNumber: number
  ) => {
    if (!isNaN(quantityAsNumber)) {
      setQuantity(quantityAsNumber);
    }
  };

  const onOperationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setOperation(value as OPERATION);
  };

  const onPriceChange = (priceAsString: string, priceAsNumber: number) => {
    setPrice(priceAsNumber);
  };

  const resetForm = () => {
    setQuantity(0);
    setIsSubmitting(false);
    setPrice(0);
    setOperation(OPERATION.REMOVE);
  };

  // handler for adding inventory items to products to simulate enqueue
  const handleSubmit = (productId: string) => {
    setIsSubmitting(true);
    const result =
      operation === OPERATION.ADD
        ? onAdd(productId, {
            inventoryItemId: faker.string.uuid(),
            productId,
            quantity: quantity,
            purchasePrice: price,
            receivedDate: new Date(),
            status: "available"
          })
        : onRemove(productId, quantity);
    setResult({
      showConfirmation: true,
      quantity: result.quantity,
      cost: result.cost,
      operation: operation,
      groups: result.groups
    });
    resetForm();
  };

  return (
    <Stack
      spacing={5}
      direction="column"
      gap={2}
      border={"1px solid"}
      borderColor={"gray.200"}
      borderRadius={"md"}
      p={10}
      bg="white"
    >
      <FormControl>
        <FormLabel color="teal">Operation</FormLabel>
        <Select placeholder="Select Operation" onChange={onOperationChange}>
          <option value={OPERATION.ADD}>Buy</option>
          <option value={OPERATION.REMOVE}>Sell</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel color="teal">Quantity</FormLabel>
        <NumberInput
          min={1}
          max={sumQuantitiesInProduct(product)}
          onChange={handleQuantityChange}
          value={quantity}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      {operation === OPERATION.ADD && (
        <FormControl>
          <FormLabel color="teal">Price</FormLabel>
          <NumberInput min={1} onChange={onPriceChange} value={price}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      )}

      <Button
        mt={4}
        colorScheme="teal"
        size="md"
        variant="solid"
        isLoading={isSubmitting}
        type="submit"
        aria-label="add"
        onClick={() => handleSubmit(product.productId)}
      >
        {operation == OPERATION.ADD
          ? `Buy ${quantity} items`
          : `Sell ${quantity} items`}
      </Button>
    </Stack>
  );
};
