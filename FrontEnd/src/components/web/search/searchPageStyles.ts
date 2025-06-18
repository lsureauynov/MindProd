import type { SystemStyleObject } from '@chakra-ui/react';

export const searchPageStyles: { [key: string]: SystemStyleObject } = {
  container: {
    maxW: 'container.xl',
    py: 8,
  },
  header: {
    mb: 4,
  },
  searchIcon: {
    color: 'gray.300',
  },
  noResultsText: {
    textAlign: 'center',
    color: 'gray.500',
  },
  loadingCenter: {
    h: '100vh',
  },
  errorCenter: {
    h: '100vh',
  },
  errorText: {
    color: 'red.500',
  },
  spinner: {
    color: 'brand.primary.500',
  },
};

export const searchPageProps = {
  container: {
    spacing: 8,
    align: 'stretch' as const,
  },
  grid: {
    columns: { base: 1, md: 2, lg: 3 },
    spacing: 6,
  },
  spinner: {
    size: 'xl' as const,
  },
}; 