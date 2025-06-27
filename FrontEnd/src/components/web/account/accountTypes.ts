import type { ChangeEvent } from 'react';

export interface UserProfile {
    name: string;
    email: string;
    image_url: string;
}

export interface UserData {
    name: string;
    email: string;
    currentPassword: string;
    newPassword: string;
}

export interface AccountFormProps {
    userData: UserData;
    isEditing: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
    onCancel: () => void;
    isLoading: boolean;
    onToggleEdit: () => void;
}

export interface AccountHeaderProps {
    userProfil: UserProfile;
    isEditing: boolean;
    onEditAvatar: () => void;
}

export interface DeleteAccountDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cancelRef: React.RefObject<HTMLButtonElement>;
}