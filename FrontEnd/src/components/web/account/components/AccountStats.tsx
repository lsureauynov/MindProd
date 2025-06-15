import { Stat, StatLabel, StatNumber, SimpleGrid, StatGroup } from '@chakra-ui/react';
import { accountStatsStyles, accountStatsProps } from './accountStatsStyles';
import type { Stats } from '../accountTypes.ts'

const AccountStats = ({ storiesPlayed, storiesCompleted, accuracy } : Stats) => (
    <StatGroup sx={accountStatsStyles.container}>
        <SimpleGrid 
            columns={accountStatsProps.grid.columns} 
            spacing={accountStatsProps.grid.spacing} 
            width={accountStatsProps.grid.width}
        >
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Histoires jouées</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.storiesPlayedNumber }}>
                    {storiesPlayed}
                </StatNumber>
            </Stat>
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Histoires complétées</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.storiesCompletedNumber }}>
                    {storiesCompleted}
                </StatNumber>
            </Stat>
            <Stat>
                <StatLabel sx={accountStatsStyles.statLabel}>Taux de réussite</StatLabel>
                <StatNumber sx={{ ...accountStatsStyles.statNumber, ...accountStatsStyles.accuracyNumber }}>
                    {accuracy}%
                </StatNumber>
            </Stat>
        </SimpleGrid>
    </StatGroup>
);

export default AccountStats;
