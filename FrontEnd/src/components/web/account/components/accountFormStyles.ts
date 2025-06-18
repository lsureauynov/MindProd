import type { SystemStyleObject } from '@chakra-ui/react';

export const accountFormStyles: { [key: string]: SystemStyleObject } = {
  form: {
    width: 'full',
    align: 'stretch',
    border: '1px solid',
    borderColor: 'gray.700',
    borderRadius: 'lg',
    p: 6,
    boxShadow: 'md',
    bg: 'gray.800',
  },
  divider: {
    borderColor: 'gray.600',
  },
  buttonContainer: {
    justify: 'flex-end',
  },
  cancelButton: {
    variant: 'outline',
  },
  saveButton: {
    colorScheme: 'teal',
  },
  editButton: {
    colorScheme: 'blue',
  },
};

export const accountFormProps = {
  form: {
    spacing: 6,
  },
  buttonContainer: {
    spacing: 4,
  },
}; 