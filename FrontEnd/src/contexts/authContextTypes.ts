import type { UserProfile } from '../services/userTypes';
import type { LoginCredentials, RegisterCredentials } from '../services/userTypes';


export interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<UserProfile>;
    logout: () => void;
    isLoading: boolean;
    user: UserProfile | null;
    fetchUser: () => Promise<void>;
}