import { keyframes } from '@emotion/react';

const pulseKeyframes = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

export const attemptsIndicatorStyles = {
  container: (isLowAttempts: boolean) => ({
    bg: "gray.800",
    borderRadius: "xl",
    p: 4,
    borderWidth: "1px",
    borderColor: isLowAttempts ? "red.500" : "whiteAlpha.200",
    transition: "all 0.3s",
    position: "relative" as const,
    overflow: "hidden",
    _before: {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bg: isLowAttempts ? 'red.500' : 'whiteAlpha.100',
      opacity: 0.1,
    },
  }),
  mainStack: {
    spacing: 4,
    align: "center" as const,
  },
  contentBox: {
    flex: "1",
  },
  label: {
    fontSize: "sm",
    color: "whiteAlpha.700",
    mb: 1,
  },
  attemptsStack: {
    spacing: 2,
  },
  attemptDot: (index: number, remainingAttempts: number, isLowAttempts: boolean) => ({
    w: "12px",
    h: "12px",
    borderRadius: "full",
    bg: index < remainingAttempts ? 
      (isLowAttempts ? "red.500" : "brand.primary.500") : 
      "whiteAlpha.200",
    animation: index < remainingAttempts && isLowAttempts ? `${pulseKeyframes} 2s infinite` : undefined,
    transition: "all 0.3s",
    _hover: {
      transform: index < remainingAttempts ? "scale(1.2)" : "none",
    },
  }),
  warningBox: {
    animation: `${pulseKeyframes} 2s infinite`,
  },
  warningIcon: {
    w: 6,
    h: 6,
    color: "red.500",
  },
};

export const attemptsIndicatorProps = {
  labelText: "Essais restants",
  tooltipText: "Dernier essai ! Réfléchissez bien...",
  tooltipPlacement: "top" as const,
}; 