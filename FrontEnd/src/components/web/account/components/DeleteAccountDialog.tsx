import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import type { DeleteAccountDialogProps } from '../accountTypes.ts';

const DeleteAccountDialog = ({ isOpen, onClose, onConfirm }: DeleteAccountDialogProps) => {
    const cancelRef = useRef<HTMLButtonElement  | null>(null);

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
            <AlertDialogOverlay>
                <AlertDialogContent bg="gray.800" border="1px solid" borderColor="gray.700">
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Supprimer le compte
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Êtes-vous sûr ? Cette action est irréversible.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            Supprimer
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteAccountDialog;
