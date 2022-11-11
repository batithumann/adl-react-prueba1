import { ChakraProvider, Heading } from "@chakra-ui/react";
import MiApi from "./components/MiApi";
import Footer from "./components/Footer";
import "dracula-ui/styles/dracula-ui.css";
import "./App.css";

function App() {
  return (
    <ChakraProvider>
      <div className="header"></div>
      <Heading mt="5" textAlign="center">
        Cartas promocionales Modern Horizon II
      </Heading>
      <MiApi />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
