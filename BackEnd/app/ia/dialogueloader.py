from game.models.dialogue import Dialogue

class DialogueLoader:
    def __init__(self, character, player, session):
        self.character = character
        self.player = player
        self.session = session

    def get_dialogue_history_for_prompt(self):
        dialogues = Dialogue.objects.filter(
            character=self.character,
            player=self.player,
            session=self.session
        ).order_by("created_at")

        history = []
        for dialogue in dialogues:
            history.append({"role": "user", "content": dialogue.player_question})
            history.append({"role": "assistant", "content": dialogue.character_answer})

        return history


