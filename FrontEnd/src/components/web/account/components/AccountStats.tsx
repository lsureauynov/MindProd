import { Stat, StatLabel, StatNumber, SimpleGrid, StatGroup } from '@chakra-ui/react';
import type { Stats } from '../accountTypes.ts'

const AccountStats = ({ storiesPlayed, storiesCompleted, accuracy } : Stats) => (
    <StatGroup textAlign="center" bg="gray.700" p={6} borderRadius="lg">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} width="full">
            <Stat>
                <StatLabel color="whiteAlpha.600" fontSize="lg">Histoires jouées</StatLabel>
                <StatNumber color="brand.primary.400" fontSize="3xl">{storiesPlayed}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel color="whiteAlpha.600" fontSize="lg">Histoires complétées</StatLabel>
                <StatNumber color="brand.secondary.400" fontSize="3xl">{storiesCompleted}</StatNumber>
            </Stat>
            <Stat>
                <StatLabel color="whiteAlpha.600" fontSize="lg">Taux de réussite</StatLabel>
                <StatNumber color="brand.accent.400" fontSize="3xl">{accuracy}%</StatNumber>
            </Stat>
        </SimpleGrid>
    </StatGroup>
);

export default AccountStats;
