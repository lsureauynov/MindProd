import {
    VStack,
    FormControl,
    FormLabel,
    Input,
    Button,
    HStack,
    Divider,
} from '@chakra-ui/react';
import { useRef } from 'react';
import type { RefObject } from 'react';
import type { AccountFormProps } from '../accountTypes.ts';

const AccountForm = ({
                         userData,
                         isEditing,
                         onChange,
                         onSave,
                         onCancel,
                         isLoading,
                         onToggleEdit,
                     }: AccountFormProps) => {
    const initialRef: RefObject<HTMLInputElement> = useRef(null);

    return (
        <VStack
            as="form"
            spacing={6}
            width="full"
            align="stretch"
            border="1px solid"
            borderColor="gray.700"
            borderRadius="lg"
            p={6}
            boxShadow="md"
            bg="gray.800"
        >
            <FormControl isDisabled={!isEditing}>
                <FormLabel>Nom</FormLabel>
                <Input
                    ref={initialRef}
                    type="text"
                    name="name"
                    value={userData.name}
                    onChange={onChange}
                />
            </FormControl>

            <FormControl isDisabled={!isEditing}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={onChange}
                />
            </FormControl>

            <FormControl isDisabled={!isEditing}>
                <FormLabel>Mot de passe actuel</FormLabel>
                <Input
                    type="password"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={onChange}
                />
            </FormControl>

            <FormControl isDisabled={!isEditing}>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <Input
                    type="password"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={onChange}
                />
            </FormControl>

            <Divider borderColor="gray.600" />

            <HStack spacing={4} justify="flex-end">
                {isEditing ? (
                    <>
                        <Button variant="outline" onClick={onCancel}>
                            Annuler
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={onSave}
                            isLoading={isLoading}
                            loadingText="Sauvegarde..."
                        >
                            Sauvegarder
                        </Button>
                    </>
                ) : (
                    <Button onClick={onToggleEdit} colorScheme="blue">
                        Modifier
                    </Button>
                )}
            </HStack>
        </VStack>
    );
};

export default AccountForm;
