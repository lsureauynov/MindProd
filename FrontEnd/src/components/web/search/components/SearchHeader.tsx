import {
  Box,
  Container,
  Heading,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ searchQuery, onSearchChange }) => {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box textAlign="center" mb={8}>
      <Container maxW="container.xl" py={8}>
        <Heading as="h1" size="2xl" mb={4}>
          Discover Mysteries
        </Heading>
        <Text fontSize="xl" color={textColor} mb={8}>
          Plongez dans un monde d'enquêtes fascinantes
        </Text>
        
        <InputGroup maxW="600px" mx="auto">
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Rechercher par titre, résumé ou auteur..."
            size="lg"
            bg="white"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            _focus={{
              boxShadow: 'outline',
              borderColor: 'blue.500',
            }}
          />
        </InputGroup>
      </Container>
    </Box>
  );
};

export default SearchHeader; 