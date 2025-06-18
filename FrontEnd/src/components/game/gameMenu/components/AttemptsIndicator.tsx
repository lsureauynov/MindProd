import {
  Box,
  HStack,
  Text,
  Icon,
  Tooltip,
} from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';
import { attemptsIndicatorStyles, attemptsIndicatorProps } from './attemptsIndicatorStyles';

interface AttemptsIndicatorProps {
  remainingAttempts: number;
  totalAttempts: number;
}

export const AttemptsIndicator: React.FC<AttemptsIndicatorProps> = ({
  remainingAttempts,
  totalAttempts,
}) => {
  const isLowAttempts = remainingAttempts === 1;

  return (
    <Box sx={attemptsIndicatorStyles.container(isLowAttempts)}>
      <HStack sx={attemptsIndicatorStyles.mainStack}>
        <Box sx={attemptsIndicatorStyles.contentBox}>
          <Text sx={attemptsIndicatorStyles.label}>
            {attemptsIndicatorProps.labelText}
          </Text>
          <HStack sx={attemptsIndicatorStyles.attemptsStack}>
            {[...Array(totalAttempts)].map((_, index) => (
              <Box
                key={index}
                sx={attemptsIndicatorStyles.attemptDot(index, remainingAttempts, isLowAttempts)}
              />
            ))}
          </HStack>
        </Box>
        {isLowAttempts && (
          <Tooltip 
            label={attemptsIndicatorProps.tooltipText}
            placement={attemptsIndicatorProps.tooltipPlacement}
            hasArrow
          >
            <Box sx={attemptsIndicatorStyles.warningBox}>
              <Icon
                as={WarningIcon}
                sx={attemptsIndicatorStyles.warningIcon}
              />
            </Box>
          </Tooltip>
        )}
      </HStack>
    </Box>
  );
}; 