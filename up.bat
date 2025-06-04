@echo off
echo Lancement de BackEnd...
docker-compose -f BackEnd\docker-compose.yml up -d

echo Lancement de FrontEnd...
docker-compose -f FrontEnd\docker-compose.yml up -d

echo Tous les services sont lances.
pause
