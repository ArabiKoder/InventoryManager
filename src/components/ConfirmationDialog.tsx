import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalContent,
  ModalFooter,
  Box,
  Highlight,
  Thead,
  Text,
  Table,
  Tr,
  Th,
  Td,
  Heading,
  Tbody,
  Divider
} from "@chakra-ui/react";
import { OPERATION } from "../models";

export interface OnSubmitReturnType {
  quantity: number;
  cost: number;
  showConfirmation: boolean;
  operation: OPERATION;
  groups: Map<string, number>;
}

interface ConfirmationDialogProps {
  onClose: () => void;
  result: OnSubmitReturnType;
}

export const ConfirmationDialog = ({
  onClose,
  result
}: ConfirmationDialogProps) => {
  const operationText =
    result.operation === OPERATION.ADD ? "purchased" : "sold";
  const fromTo = result.operation === OPERATION.ADD ? "to" : "from";

  return (
    <Modal
      onClose={onClose}
      isOpen={true}
      isCentered
      motionPreset="slideInBottom"
      size="xl"
      scrollBehavior={"inside"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="2xl" color="teal" ml={5} mb={2}>
            Inventory updated successfully!
          </Text>
          <Divider />
          <Box px={5} mt={3} flexDirection="column">
            <Table borderRadius={"md"} mb={2} size={"lg"} overflowY={"scroll"}>
              <Thead>
                <Tr bg="gray.100">
                  <Th isNumeric>Price</Th>
                  <Th isNumeric>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.from(result.groups).map(([g, value], i) => {
                  return (
                    <Tr
                      key={i}
                      borderBottom={"1px solid"}
                      borderBottomColor={"ActiveBorder"}
                    >
                      <Td isNumeric>{g}</Td>
                      <Td isNumeric>{value}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Divider />

            <Text color="gray.900" mt={2} fontSize={"small"}>
              {`You have ${operationText} ${result.quantity} items ${fromTo} your inventory for a total of $${result.cost}`}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
