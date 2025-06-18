import type { SystemStyleObject } from '@chakra-ui/react';

export const deleteAccountDialogStyles: { [key: string]: SystemStyleObject } = {
  content: {
    bg: 'gray.800',
    border: '1px solid',
    borderColor: 'gray.700',
  },
  header: {
    fontSize: 'lg',
    fontWeight: 'bold',
  },
  confirmButton: {
    colorScheme: 'red',
    ml: 3,
  },
}; 