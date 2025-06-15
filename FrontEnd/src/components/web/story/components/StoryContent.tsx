import {
  Box,
  Image,
  Text,
  Grid,
  GridItem,
  VStack,
} from '@chakra-ui/react';

interface StoryContentProps {
  content: string;
  imageUrl: string;
  title: string;
  author: string;
  date: string;
}

const StoryContent: React.FC<StoryContentProps> = ({ 
  content, 
  imageUrl, 
  title,
  author,
  date
}) => {
  return (
    <Box
      borderRadius="xl"
      overflow="hidden"
      boxShadow="2xl"
      bg="gray.800"
      borderWidth="1px"
      borderColor="whiteAlpha.200"
      p={{ base: 4, md: 8 }}
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(8px)',
        zIndex: 0,
      }}
    >
      <Grid 
        templateColumns={{ base: "1fr", md: "400px 1fr" }} 
        gap={{ base: 4, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <GridItem>
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="xl"
            transition="transform 0.3s"
            _hover={{
              transform: 'scale(1.02)',
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              w="full"
              h={{ base: "300px", md: "400px" }}
              objectFit="cover"
              transition="transform 0.3s"
              _hover={{
                transform: 'scale(1.1)',
              }}
            />
          </Box>
        </GridItem>
        <GridItem>
          <VStack align="start" spacing={{ base: 3, md: 4 }}>
            <Box>
              <Text 
                fontSize={{ base: "md", md: "lg" }} 
                color="brand.primary.400"
                fontFamily="mono"
                mb={2}
              >
                Par {author}
              </Text>
              <Text 
                fontSize={{ base: "xs", md: "sm" }} 
                color="whiteAlpha.600"
                fontFamily="mono"
              >
                {date}
              </Text>
            </Box>
            <Text 
              fontSize={{ base: "md", md: "lg" }}
              color="whiteAlpha.900"
              whiteSpace="pre-wrap"
              lineHeight="1.8"
              fontFamily="body"
              textAlign="justify"
            >
              {content}
            </Text>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default StoryContent; 