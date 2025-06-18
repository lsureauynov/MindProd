import type { SystemStyleObject } from '@chakra-ui/react';

export const contactStyles: { [key: string]: SystemStyleObject } = {
  main: {
    minH: '100vh',
    pt: '80px',
    bg: 'gray.900',
    bgGradient: 'linear(to-b, gray.900, gray.800)',
  },
  container: {
    maxW: 'container.md',
    py: 8,
  },
};

export const contactProps = {
  container: {
    spacing: 8,
    align: 'stretch' as const,
  },
}; 