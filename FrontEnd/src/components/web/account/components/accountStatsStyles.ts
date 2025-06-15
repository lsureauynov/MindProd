import type { SystemStyleObject } from '@chakra-ui/react';

export const accountStatsStyles: { [key: string]: SystemStyleObject } = {
  container: {
    textAlign: 'center',
    bg: 'gray.700',
    p: 6,
    borderRadius: 'lg',
  },
  statLabel: {
    color: 'whiteAlpha.600',
    fontSize: 'lg',
  },
  statNumber: {
    fontSize: '3xl',
  },
  storiesPlayedNumber: {
    color: 'brand.primary.400',
  },
  storiesCompletedNumber: {
    color: 'brand.secondary.400',
  },
  accuracyNumber: {
    color: 'brand.accent.400',
  },
};

export const accountStatsProps = {
  grid: {
    columns: { base: 1, md: 3 },
    spacing: 8,
    width: 'full',
  },
}; 