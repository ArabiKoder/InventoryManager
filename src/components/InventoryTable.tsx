import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

import { InventoryItem } from "../models";

interface InventoryTableProps {
  items: InventoryItem[];
}
export const InventoryTable = ({ items }: InventoryTableProps) => {
  return (
    <Box
      p={5}
      border={"1px solid"}
      borderColor={"gray.200"}
      borderRadius={"md"}
      bg="white"
    >
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Received Date</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item, index) => (
            <Tr
              key={item.inventoryItemId}
              height="40px"
              borderBottom={"1px solid"}
              borderBottomColor={"ActiveBorder"}
            >
              <Td>{item.inventoryItemId}</Td>
              <Td>{item.receivedDate.toLocaleDateString()}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.purchasePrice}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
