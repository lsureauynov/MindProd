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
import { deleteAccountDialogStyles } from './deleteAccountDialogStyles';
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
                <AlertDialogContent sx={deleteAccountDialogStyles.content}>
                    <AlertDialogHeader sx={deleteAccountDialogStyles.header}>
                        Supprimer le compte
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Êtes-vous sûr ? Cette action est irréversible.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button 
                            colorScheme="red" 
                            onClick={onConfirm} 
                            sx={deleteAccountDialogStyles.confirmButton}
                        >
                            Supprimer
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};

export default DeleteAccountDialog;
