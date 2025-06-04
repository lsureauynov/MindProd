import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';
import SearchHeader from './components/SearchHeader';
import SearchResults from './components/SearchResults';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <Box as="main" minH="100vh" bg="gray.50" pt="80px">
      <VStack spacing={8} align="stretch">
        <SearchHeader 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />
        <SearchResults searchQuery={searchQuery} />
      </VStack>
    </Box>
  );
};

export default Search; 