export interface UserProfile {
    id: string;
    name: string;
    surname: string;
    email: string;
    image_url: string;
}

export interface UserStats {
    started: number;
    finished: number;
    survivals: number;
}

export type LoginCredentials = {
    email: string;
    password: string;
};

export type RegisterCredentials = LoginCredentials & {
    name: string;
    surname: string;
    image_url: string;
};

export type RegisterFormData = RegisterCredentials & {
    username: string;
};

export type AuthTokens = {
    access: string;
    refresh: string;
};