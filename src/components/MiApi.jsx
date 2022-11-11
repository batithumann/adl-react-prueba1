import { useEffect, useState } from "react";
import {
  Container,
  HStack,
  Box,
  Image,
  Spinner,
  Center,
  Link,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Input } from "dracula-ui";
import { StarIcon } from "@chakra-ui/icons";

const MiApi = () => {
  const [ready, setReady] = useState(false);
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState("");

  const handleChange = (event) => {
    setReady(false);
    setFilter(event.target.value);
    setReady(true);
  };

  useEffect(() => {
    setReady(false);
    const fetchCards = async () => {
      const data = await fetch(
        "https://api.scryfall.com/cards/search?q=e:pmh2"
      ).then((response) => response.json());
      setReady(true);
      setCards(data.data);
    };
    fetchCards();
  }, []);

  return (
    <Container maxW="container.xl">
      <Center my="5">
        <FormControl>
          <FormLabel fontSize="26">Búsqueda:</FormLabel>
          <Input
            color="purple"
            type="text"
            name="busqueda"
            placeholder="Escriba un texto para buscar por nombre o tipo de carta"
            value={filter}
            onChange={handleChange}
          />
        </FormControl>
      </Center>

      <HStack wrap="wrap" justify="space-between">
        {ready ? (
          cards
            .filter((card) => {
              return (
                card.name.toLowerCase().includes(filter.toLowerCase()) ||
                card.type_line.toLowerCase().includes(filter.toLowerCase())
              );
            })
            .sort((c1, c2) => {
              return c2.prices.usd_foil - c1.prices.usd_foil;
            })
            .map((card) => {
              const rating = (Math.max(5000 - card.edhrec_rank, 0) / 5000) * 5;
              return (
                <Box key={card.id}>
                  <Box
                    maxW="2xs"
                    borderColor="rgb(65, 69, 88)"
                    boxShadow="rgb(0 0 0 / 25%) 0px 4px 4px 0px"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    mb="10"
                    backgroundColor="rgb(34, 33, 44)"
                  >
                    <Link isExternal href={card.scryfall_uri}>
                      <Image
                        maxW="2xs"
                        src={card.image_uris.border_crop}
                        alt={card.name}
                      />
                    </Link>
                    <Box p="6">
                      <Box display="flex" alignItems="baseline">
                        <Box
                          color="#8a8f98"
                          fontWeight="semibold"
                          letterSpacing="wide"
                          fontSize="xs"
                          textTransform="uppercase"
                          noOfLines={1}
                        >
                          {card.type_line}
                        </Box>
                      </Box>

                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        <Link isExternal href={card.scryfall_uri}>
                          {card.name}
                        </Link>
                      </Box>

                      <Box>
                        <Link isExternal href={card.purchase_uris.tcgplayer}>
                          ${card.prices.usd_foil}
                        </Link>
                      </Box>

                      <Box display="flex" mt="2" alignItems="center">
                        {Array(5)
                          .fill("")
                          .map((_, i) => (
                            <StarIcon
                              key={i}
                              color={
                                i < Math.round(rating, 0)
                                  ? "green.400"
                                  : "#8a8f98"
                              }
                            />
                          ))}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })
        ) : (
          <Spinner mt="10" />
        )}
      </HStack>
    </Container>
  );
};

export default MiApi;
