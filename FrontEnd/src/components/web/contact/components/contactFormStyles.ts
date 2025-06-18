import type { SystemStyleObject } from '@chakra-ui/react';

export const contactFormStyles: { [key: string]: SystemStyleObject } = {
  formContainer: {
    bg: 'gray.800',
    borderRadius: 'xl',
    p: 8,
    borderWidth: '1px',
    borderColor: 'whiteAlpha.200',
    boxShadow: '2xl',
    _hover: {
      borderColor: 'brand.primary.500',
      transition: 'all 0.3s ease',
    },
  },
  title: {
    bgGradient: 'linear(to-r, brand.primary.400, brand.secondary.400)',
    bgClip: 'text',
    fontFamily: 'heading',
  },
  subtitle: {
    color: 'whiteAlpha.600',
  },
  formLabel: {
    color: 'whiteAlpha.900',
  },
  input: {
    bg: 'gray.700',
    border: 'none',
    color: 'white',
    _hover: { bg: 'gray.600' },
    _focus: { bg: 'gray.600', borderColor: 'brand.primary.400' },
  },
  textarea: {
    minH: '200px',
    bg: 'gray.700',
    border: 'none',
    color: 'white',
    _hover: { bg: 'gray.600' },
    _focus: { bg: 'gray.600', borderColor: 'brand.primary.400' },
  },
  select: {
    bg: 'gray.700',
    border: 'none',
    color: 'white',
    _hover: { bg: 'gray.600' },
    _focus: { bg: 'gray.600', borderColor: 'brand.primary.400' },
  },
  submitButton: {
    w: 'full',
    bgGradient: 'linear(to-r, brand.primary.500, brand.secondary.500)',
    color: 'white',
    fontSize: 'md',
    _hover: {
      bgGradient: 'linear(to-r, brand.primary.600, brand.secondary.600)',
      transform: 'translateY(-2px)',
    },
    _active: { transform: 'translateY(0)' },
  },
};

export const contactFormProps = {
  container: {
    spacing: 8,
    align: 'stretch' as const,
  },
  header: {
    spacing: 2,
    align: 'center' as const,
  },
  form: {
    spacing: 6,
  },
  title: {
    size: 'xl' as const,
  },
  submitButton: {
    size: 'lg' as const,
  },
}; 