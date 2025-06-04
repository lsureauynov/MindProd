@echo off
echo Build de BackEnd...
docker-compose -f BackEnd\docker-compose.yml build

echo Build de FrontEnd...
docker-compose -f FrontEnd\docker-compose.yml build

echo Build termine.
pause
