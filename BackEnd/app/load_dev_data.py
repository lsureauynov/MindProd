import os
import sys
import subprocess

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def run_command(command):
    result = subprocess.run(command, shell=True, text=True, capture_output=True)
    if result.returncode != 0:
        print(f"Error: {command}\n{result.stderr}")
        sys.exit(1)
    print(f" {command}")
    return result.stdout.strip()

def flush_db():
    print("Flush database...")
    run_command("python manage.py flush --no-input")

def migrate():
    print("Models migration...")
    run_command("python manage.py migrate")

def load_fixtures():
    print("Fixtures Loading...")

    fixtures = [
        'user/fixtures/user.json',
        'game/fixtures/player.json',
        'game/fixtures/scenario.json',
        'game/fixtures/story.json',
        'game/fixtures/session.json',
        'game/fixtures/character.json',
        'game/fixtures/dialogue.json',
        'game/fixtures/clue.json',
        'game/fixtures/character_attribute.json',
        'game/fixtures/characters_reveal_clue.json',
        'game/fixtures/discovered_clue.json',
        'game/fixtures/accusation.json',
    ]

    for fixture in fixtures:
        fixture_path = os.path.join(BASE_DIR, fixture)
        print(f"Fixture : {fixture}")
        run_command(f"python manage.py loaddata {fixture_path}")

def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mindprod.settings")

    if "--flush" in sys.argv:
        flush_db()

    migrate()
    load_fixtures()

    print("\n Data Fixtures Success !")

if __name__ == "__main__":
    main()
