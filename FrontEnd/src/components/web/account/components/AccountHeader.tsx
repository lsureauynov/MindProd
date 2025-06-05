import { Avatar, Box, Button } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import type { AccountHeaderProps } from '../accountTypes.ts';


const AccountHeader = ({ userProfil, isEditing, onEditAvatar }: AccountHeaderProps) => (
    <Box position="relative">
        <Avatar
            size="2xl"
            name={userProfil.name}
            src={userProfil.image_url}
            border="4px solid"
            borderColor="brand.primary.500"
        />
        {isEditing && (
            <Button
                size="sm"
                position="absolute"
                bottom="0"
                right="0"
                colorScheme="blue"
                rounded="full"
                leftIcon={<EditIcon />}
                onClick={onEditAvatar}
            >
                Modifier
            </Button>
        )}
    </Box>
);

export default AccountHeader;
