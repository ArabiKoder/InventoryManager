import {
  Box,
  Button,
  Image,
  Card,
  CardBody,
  Badge,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";

import { Product } from "../models";

interface ProductCardProps {
  product: Product;
  onClick: (productId: string) => void;
}

export const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card
      bg="white"
      p={2}
      m={2}
      borderRadius={10}
      variant="elevated"
      cursor={"pointer"}
    >
      <CardBody>
        <Image
          borderRadius={10}
          src={product.images?.[0]}
          alt={`Image of ${product.productName}`}
          boxSize="fit-content"
        />

        <Box p={6}>
          <Box flexDirection="row" alignItems="baseline">
            {product.brand && (
              <Badge borderRadius="md" px="3" colorScheme="teal" mr={2}>
                {product.brand}
              </Badge>
            )}
          </Box>
          <Divider mt={3} />

          <CardFooter justify="space-between" gap={2} flexWrap="wrap">
            <Box
              fontSize="xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {product.productName.substring(0, 20)}
            </Box>
            <Button
              colorScheme="teal"
              size="md"
              variant="outline"
              leftIcon={<MdSettings />}
              onClick={() => {
                onClick(product.productId);
              }}
            >
              Manage
            </Button>
          </CardFooter>
        </Box>
      </CardBody>
    </Card>
  );
};
