# Variables chemins (à adapter selon ton projet)
BACKEND_DIR=./BackEnd
FRONTEND_DIR=./FrontEnd

.PHONY: all build-back build-front up-back up-front restart-back restart-front down

# Build backend
build-back:
	docker compose -f $(BACKEND_DIR)/docker-compose.yml build

# Build frontend
build-front:
	docker compose -f $(FRONTEND_DIR)/docker-compose.yml build

# Up backend
up-back:
	docker compose -f $(BACKEND_DIR)/docker-compose.yml up -d

# Up frontend
up-front:
	docker compose -f $(FRONTEND_DIR)/docker-compose.yml up -d

# Restart backend
restart-back: down-back up-back

# Restart frontend
restart-front: down-front up-front

# Down backend
down-back:
	docker compose -f $(BACKEND_DIR)/docker-compose.yml down

# Down frontend
down-front:
	docker compose -f $(FRONTEND_DIR)/docker-compose.yml down

# Tout démarrer (backend + frontend)
up: up-back up-front

# Tout arrêter (backend + frontend)
down: down-back down-front

# Tout rebuild (backend + frontend)
build: build-back build-front
