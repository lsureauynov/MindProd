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
PGADMIN_DEFAULT_EMAIL=pg_admin_email
PGADMIN_DEFAULT_PASSWORD=pg_admin_password
OLLAMA_MODEL_NAME=model_ollama
OLLAMA_URL = "http://<IP>:11434/api/chat"
```

### Démarrage avec Docker

Ce système fonctionne uniquement sur Windows. Assurez-vous d'avoir Docker Desktop installé et configuré pour Windows.
Si vous êtes sur Linux ou Mac, vous pouvez utiliser le fichier makefile.
```bash
# Pour tout le projet
docker network create mindprod_network

# Pour le frontend uniquement
cd FrontEnd && docker compose build
cd FrontEnd && docker compose up

# Pour le backend uniquement
cd BackEnd && docker compose build
cd BackEnd && docker compose up
```

Installer ensuite ollama sur votre ordinateur et effectuer les commandes suivantes : 
```
ollama pull gemma3:latest
ollama serve
```

Ensuite, il faut effectuer la migration des données : 
```bash
docker exec -it mindprod_api python manage.py makemigrations
docker exec -it mindprod_api python manage.py migrate
```

Itiliser un dump de la base de données présent dans BackEnd/data_dump.sql (vous pouvez utilisé pgadmin dans queryTools > File > open puis Executer)

Pour créer un superUser :
```bash
cd BackEnd
docker exec -it mindprod_api sh
python manage.py createsuperuser
```

Il existe déjà un superuser test : superuser@example.com ; password

Enfin, il faut lancer un server Ollama avec le modèle choisie. 
Si on veut executer ollama sur une autre machine que celle contenant les docker, assurer que les deux machines ont un bridge et exécuter les commandes suivantes sur cmd de Windows: 
```bash
set OLLAMA_HOST=0.0.0.0
ollama serve
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

## 🔐 Variables d'Environnement

### Frontend (src/config/constant.ts)
```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST="db"
DB_PORT=5432
SECRET_KEY=your_secret_key
PGADMIN_DEFAULT_EMAIL=pg_admin_email
PGADMIN_DEFAULT_PASSWORD=pg_admin_password
OLLAMA_MODEL_NAME=model_ollama
OLLAMA_URL = "http://localhost:11434/api/chat"
```

## 📚 Documentation API

La documentation de l'API est disponible via Swagger UI à l'adresse :
```
http://localhost:8000/api/swagger/
```


## Adresse mail : 
lea.sureau@ynov.com
