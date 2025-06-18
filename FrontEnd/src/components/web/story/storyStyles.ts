import type { SystemStyleObject } from '@chakra-ui/react';

export const storyStyles: { [key: string]: SystemStyleObject } = {
  container: {
    maxW: 'container.xl',
    py: 8,
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
  imageContainer: {
    position: 'relative',
    h: '400px',
  },
  image: {
    objectFit: 'cover',
    w: '100%',
    h: '100%',
    borderRadius: 'xl',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    bg: 'rgba(0, 0, 0, 0.7)',
    p: 6,
    borderBottomRadius: 'xl',
  },
  title: {
    color: 'white',
  },
  contentBox: {
    bg: 'gray.800',
    p: 6,
    borderRadius: 'xl',
  },
  contentText: {
    color: 'whiteAlpha.900',
    fontSize: 'lg',
    whiteSpace: 'pre-line',
  },
  playButton: {
    width: '100%',
  },
};

export const storyProps = {
  container: {
    spacing: 8,
    align: 'stretch' as const,
  },
  spinner: {
    size: 'xl' as const,
  },
  title: {
    size: 'xl' as const,
  },
}; 