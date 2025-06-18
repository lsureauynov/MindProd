import type { SystemStyleObject } from '@chakra-ui/react';

export const storyCardStyles: { [key: string]: SystemStyleObject } = {
  link: {
    _hover: { textDecoration: 'none' },
  },
  card: {
    borderWidth: '1px',
    borderRadius: 'xl',
    overflow: 'hidden',
    bg: 'gray.800',
    borderColor: 'whiteAlpha.200',
    transition: 'all 0.3s',
    position: 'relative',
    _hover: {
      transform: 'translateY(-4px)',
      shadow: '2xl',
      borderColor: 'brand.primary.500',
      _before: {
        opacity: 1,
      }
    },
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bg: 'rgba(0, 0, 0, 0.2)',
      opacity: 0,
      transition: 'opacity 0.3s',
      zIndex: 1,
    },
  },
  image: {
    height: '200px',
    width: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s',
    _groupHover: {
      transform: 'scale(1.05)',
    },
  },
  content: {
    p: 6,
    bg: 'rgba(26, 32, 44, 0.8)',
    backdropFilter: 'blur(8px)',
  },
  title: {
    color: 'whiteAlpha.900',
    fontFamily: 'heading',
    bgGradient: 'linear(to-r, brand.primary.400, brand.secondary.400)',
    bgClip: 'text',
  },
  description: {
    color: 'whiteAlpha.800',
    fontSize: 'md',
    lineHeight: '1.6',
  },
  footer: {
    fontSize: 'sm',
    color: 'brand.primary.400',
    fontFamily: 'mono',
  },
};

export const storyCardProps = {
  content: {
    align: 'stretch' as const,
    spacing: 4,
  },
  title: {
    as: 'h3' as const,
    size: 'md' as const,
    noOfLines: 2,
  },
  description: {
    noOfLines: 3,
  },
  footer: {
    spacing: 4,
  },
}; 