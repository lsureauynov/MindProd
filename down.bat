@echo off
echo Arret de BackEnd...
docker-compose -f BackEnd\docker-compose.yml down

echo Arret de FrontEnd...
docker-compose -f FrontEnd\docker-compose.yml down

echo Tous les services sont arretes.
pause
