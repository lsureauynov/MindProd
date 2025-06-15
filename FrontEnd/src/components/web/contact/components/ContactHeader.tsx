import { Box, Heading, Text } from '@chakra-ui/react';
import { contactHeaderStyles, contactHeaderProps } from './contactHeaderStyles';

export const ContactHeader: React.FC = () => {
  return (
    <Box sx={contactHeaderStyles.container}>
      <Heading 
        as="h1"
        size={contactHeaderProps.title.size} 
        sx={contactHeaderStyles.title}
      >
        Contactez-nous
      </Heading>
      <Text sx={contactHeaderStyles.subtitle}>
        Une question ? Une suggestion ? N'hésitez pas à nous écrire !
      </Text>
    </Box>
  );
}; 