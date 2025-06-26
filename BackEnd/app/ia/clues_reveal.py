from game.models.clue import Clue
from game.models.discovered_clue import  DiscoveredClue
from game.models.player import Player
from game.models.characters_reveal_clue import CharactersRevealClue
from game.serializers.discovered_clue_serializer import DiscoveredClueSerializer
import json
import re


class CluesReveal:

    @staticmethod
    def process_ia_reveal_clue_from_text(response_text, player, session):
        match = re.search(r'\[indice_revele:\s*(.*?)\]', response_text)
        if match:
            revealed_id = match.group(1)
            try:
                clue_id = CharactersRevealClue.objects.get(id=revealed_id).clue.id
                data = {
                    "clue": clue_id,
                    "player": player.id,
                    "session": session.id
                }
                serializer = DiscoveredClueSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                else:
                    print(f"Erreur création DiscoveredClue: {serializer.errors}")
            except CharactersRevealClue.DoesNotExist:
                print(f"Indice avec id {revealed_id} introuvable.")

        cleaned_response = re.sub(r'\[indice_revele:.*?\]', '', response_text).strip()
        return cleaned_response

