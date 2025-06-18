import { Avatar, Box, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { accountHeaderStyles, accountHeaderProps } from './accountHeaderStyles';
import type { AccountHeaderProps } from '../accountTypes.ts';

const AccountHeader = ({ userProfil, isEditing, onEditAvatar }: AccountHeaderProps) => (
    <Box sx={accountHeaderStyles.container}>
        <Avatar
            size={accountHeaderProps.avatar.size}
            name={userProfil.name}
            src={userProfil.image_url}
            sx={accountHeaderStyles.avatar}
        />
        {isEditing && (
            <Button
                size={accountHeaderProps.editButton.size}
                colorScheme={accountHeaderProps.editButton.colorScheme}
                sx={accountHeaderStyles.editButton}
                leftIcon={<EditIcon />}
                onClick={onEditAvatar}
            >
                Modifier
            </Button>
        )}
    </Box>
);

export default AccountHeader;
