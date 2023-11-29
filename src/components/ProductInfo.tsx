import { Box, Image, Heading, Badge, Text, Divider } from "@chakra-ui/react";
import { Product } from "../models";
import { sumQuantitiesInProduct } from "../hooks/useInventory/utils";
interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <Box>
      {product.images && product.images[0] && (
        <Image
          borderRadius="md"
          src={product.images[0]}
          alt={`Image of ${product.productName}`}
          boxSize="500px"
          mb={4}
        />
      )}
      <Heading color={"teal"} fontSize="xl" mb={1}>
        {product.productName}
      </Heading>
      <Badge borderRadius="md" px="2" colorScheme="teal" maxW={"fit-content"}>
        {product.brand}
      </Badge>
      <Text mt={2}>{product.description}</Text>

      <Text mt={2} fontSize="lg">
        Price: ${product.price}
      </Text>
      <Text mt={1} fontSize="md">
        Quantity Available: {sumQuantitiesInProduct(product) || 0}
      </Text>
      <Divider my={4} />
    </Box>
  );
};
