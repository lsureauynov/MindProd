import type { SystemStyleObject } from '@chakra-ui/react';

export const accountStyles: { [key: string]: SystemStyleObject } = {
  main: {
    minH: '100vh',
    pt: '80px',
    bgGradient: 'linear(to-b, gray.900, gray.800)',
  },
  container: {
    maxW: 'container.lg',
    py: 8,
  },
  title: {
    bgGradient: 'linear(to-r, brand.primary.400, brand.secondary.400)',
    bgClip: 'text',
    fontSize: '4xl',
  },
};

export const accountProps = {
  container: {
    spacing: 8,
  },
}; 