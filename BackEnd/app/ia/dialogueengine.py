from ia.caseloader import CaseLoader
from ia.dialogueloader import DialogueLoader
from ia.promptbuilder import PromptBuilder
from ia.ollama import Ollama

class DialogueEngine:

    def __init__(self, character, session, player, player_question):
        self.character = character
        self.session = session
        self.player = player
        self.player_question = player_question
        self.case_loader = CaseLoader(character)
        self.dialogue_loader = DialogueLoader(character, player, session)
        self.ollama = Ollama()

    def run(self):

        scenario = self.case_loader.get_story_scenario()
        role = self.case_loader.get_character_role()
        personality = self.case_loader.get_character_personality()
        backstory = self.case_loader.get_character_backstory()
        attributes = self.case_loader.get_character_attributes()
        revealed_clues = self.case_loader.get_character_revealed_clues()

        history = self.dialogue_loader.get_dialogue_history_for_prompt()

        prompt = PromptBuilder(
            scenario=scenario,
            role=role,
            personality=personality,
            backstory=backstory,
            attributes=attributes,
            revealed_clues=revealed_clues,
            history=history,
            question=self.player_question
        )

        prompt = prompt.build()

        answer = self.ollama.ask_ollama(prompt)

        return answer


