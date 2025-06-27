import { Stat, StatLabel, StatNumber, SimpleGrid, StatGroup } from '@chakra-ui/react';
import { accountStatsStyles, accountStatsProps } from './accountStatsStyles';
import type { UserStats } from '../../../../services/userTypes.ts'

const AccountStats = ({ started, finished, survivals } : UserStats) => (
    <StatGroup sx={accountStatsStyles.container}>
        <SimpleGrid 
            columns={accountStatsProps.grid.columns} 
            spacing={accountStatsProps.grid.spacing} 
            width={accountStatsProps.grid.width}
        >
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Histoires jouées</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.storiesPlayedNumber }}>
                    {started}
                </StatNumber>
            </Stat>
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Histoires complétées</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.storiesCompletedNumber }}>
                    {finished}
                </StatNumber>
            </Stat>
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Taux de réussite</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.accuracyNumber }}>
                    {survivals}%
                </StatNumber>
            </Stat>
        </SimpleGrid>
    </StatGroup>
);

export default AccountStats;
