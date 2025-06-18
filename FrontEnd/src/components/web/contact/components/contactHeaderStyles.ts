import type { SystemStyleObject } from '@chakra-ui/react';

export const contactHeaderStyles: { [key: string]: SystemStyleObject } = {
  container: {
    textAlign: 'center',
  },
  title: {
    mb: 2,
  },
  subtitle: {
    color: 'gray.600',
  },
};

export const contactHeaderProps = {
  title: {
    size: 'xl' as const,
  },
}; 