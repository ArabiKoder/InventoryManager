import { ChakraProvider, Box } from "@chakra-ui/react";
import Products from "./components/Products";

const App = () => {
  return (
    <ChakraProvider>
      <Box bg="gray.200" p={10}>
        <Products />
      </Box>
    </ChakraProvider>
  );
};

export default App;
