# MindProd - Application d'Enquêtes Interactive avec IA

MindProd est une application web moderne qui combine l'intelligence artificielle et le jeu d'enquête. Elle est divisée en deux parties principales : une interface utilisateur React (Frontend) et une API Python (Backend), offrant une expérience immersive d'investigation assistée par IA.

## 🎯 Caractéristiques Principales

- Interface utilisateur moderne et responsive
- Système de dialogue interactif avec IA
- Gestion des enquêtes et des indices
- Système d'authentification sécurisé
- Base de données PostgreSQL pour la persistance des données
- Architecture microservices avec Docker
- Interface utilisateur construite avec Chakra UI
- Animations fluides avec Framer Motion

## 🏗️ Architecture du Projet

```
MindProd/
├── FrontEnd/                 # Application React avec TypeScript
│   ├── src/
│   │   ├── components/       # Composants React réutilisables
│   │   ├── contexts/        # Contextes React (Auth, etc.)
│   │   ├── services/        # Services API et logique métier
│   │   ├── theme/           # Configuration du thème Chakra UI
│   │   └── types/           # Types TypeScript
│   └── public/              # Ressources statiques
└── BackEnd/                 # API Python Django
    ├── app/                 # Code source principal
    │   ├── api/            # Endpoints API
    │   ├── game/           # Logique du jeu
    │   ├── ia/             # Services d'IA
    │   └── user/           # Gestion des utilisateurs
    └── DataBase/           # Scripts et schémas de base de données
```

## 🛠️ Stack Technique

### Frontend
- **Framework**: React 18 avec TypeScript
- **Build Tool**: Vite
- **UI Framework**: Chakra UI
- **State Management**: React Context
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Style**: Emotion/Styled Components

### Backend
- **Framework**: Django REST Framework
- **Base de données**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Documentation API**: DRF-yasg (Swagger)
- **Conteneurisation**: Docker & Docker Compose

## 🚀 Installation et Démarrage

### Configuration du Backend
```bash
cd BackEnd
# Créer un fichier .env avec :
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_secret_key

```

### Démarrage avec Docker

Ce système fonctionne uniquement sur Windows. Assurez-vous d'avoir Docker Desktop installé et configuré pour Windows.
Si vous êtes sur Linux ou Mac, vous pouvez créer un fichier makefile pour automatiser les commandes.
```bash
# Pour tout le projet
.\build.bat
.\up.bat

# Pour le frontend uniquement
cd FrontEnd && docker compose build
cd FrontEnd && docker compose up

# Pour le backend uniquement
cd BackEnd && docker compose build
cd BackEnd && docker compose up
```

## 🎮 Fonctionnalités du Jeu

- **Système d'Enquête**
  - Interrogation des suspects avec IA
  - Collecte et analyse d'indices
  - Système d'accusation
  - Gestion des vies et du score

- **Interface Utilisateur**
  - Design moderne et intuitif
  - Thème sombre/clair
  - Animations fluides
  - Interface responsive

- **Système d'IA**
  - Dialogues dynamiques
  - Analyse des réponses
  - Adaptation au style du joueur
  - Génération de scénarios

## 🔐 Variables d'Environnement

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DB_NAME=mindprod
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
SECRET_KEY=your_django_secret_key
```

## 📚 Documentation API

La documentation de l'API est disponible via Swagger UI à l'adresse :
```
http://localhost:8000/api/swagger/
```

