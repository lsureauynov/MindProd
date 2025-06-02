- Pour migrer : 
python manage.py makemigrations
python manage.py migrate


- Créer un super utilisateur :
python manage.py createsuperuser


- Lancer le serveur depuis le conteneur mindprod_api:
python manage.py runserver


- updating requirements.txt :
pip3 freeze > requirements.txt
docker compose down
docker compose up --build

  