import type { SystemStyleObject } from '@chakra-ui/react';

export const accountHeaderStyles: { [key: string]: SystemStyleObject } = {
  container: {
    position: 'relative',
  },
  avatar: {
    border: '4px solid',
    borderColor: 'brand.primary.500',
  },
  editButton: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    rounded: 'full',
  },
};

export const accountHeaderProps = {
  avatar: {
    size: '2xl' as const,
  },
  editButton: {
    size: 'sm' as const,
    colorScheme: 'blue' as const,
  },
}; 