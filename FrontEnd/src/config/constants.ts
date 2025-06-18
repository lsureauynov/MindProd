export const APP_CONFIG = {
  API: {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://192.168.1.22:8080/api/v1',
    TIMEOUT: 10000,
  },
  GAME: {
    MIN_CLUES_TO_ACCUSE: 3,
    MAX_WRONG_ACCUSATIONS: 3,
    DIALOGUE_COOLDOWN: 60000, // 1 minute in milliseconds
  },
  UI: {
    TOAST_DURATION: 5000,
    ANIMATION_DURATION: 200,
    BREAKPOINTS: {
      sm: '30em',
      md: '48em',
      lg: '62em',
      xl: '80em',
    },
  },
  ROUTES: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    GAME: '/game',
    STORY: '/story',
    ACCOUNT: '/account',
    CONTACT: '/contact',
  },
} as const;

export const ERROR_MESSAGES = {
  AUTH: {
    REQUIRED: 'Vous devez être connecté pour accéder à cette page.',
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect.',
    REGISTRATION_FAILED: 'Erreur lors de l\'inscription.',
  },
  GAME: {
    LOAD_ERROR: 'Impossible de charger les données du jeu.',
    ACCUSATION_ERROR: 'Impossible de faire l\'accusation.',
    CLUE_ERROR: 'Impossible de débloquer l\'indice.',
    DIALOGUE_ERROR: 'Impossible de charger le dialogue.',
  },
  NETWORK: {
    TIMEOUT: 'La requête a pris trop de temps. Veuillez réessayer.',
    OFFLINE: 'Vous êtes hors ligne. Veuillez vérifier votre connexion.',
    SERVER_ERROR: 'Une erreur est survenue sur le serveur.',
  },
} as const;

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: 'Connexion réussie !',
    REGISTER: 'Inscription réussie !',
    LOGOUT: 'Déconnexion réussie !',
  },
  GAME: {
    CORRECT_ACCUSATION: 'Félicitations ! Vous avez trouvé le coupable !',
    CLUE_UNLOCKED: 'Indice débloqué !',
    DIALOGUE_COMPLETED: 'Dialogue terminé !',
  },
} as const; 