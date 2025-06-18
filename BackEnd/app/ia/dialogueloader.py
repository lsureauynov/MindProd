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

        history_lines = []
        for dialogue in dialogues:
            history_lines.append(f"[{self.player.username}] {dialogue.player_question}")
            history_lines.append(f"[{self.character.name.upper()}] {dialogue.character_answer}")

        return "\n".join(history_lines)
