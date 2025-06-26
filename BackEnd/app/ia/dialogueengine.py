from ia.caseloader import CaseLoader
from ia.dialogueloader import DialogueLoader
from ia.promptbuilder import PromptBuilder
#from ia.nebillm import NebiLLM
from ia.ollama import Ollama
from ia.clues_reveal import CluesReveal

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
        attributes = self.case_loader.get_character_attributes()
        revealed_clues = self.case_loader.get_character_revealed_clues()
        backstory = self.case_loader.get_character_backstory()
        name = self.case_loader.get_character_name()
        history = self.dialogue_loader.get_dialogue_history_for_prompt()

        prompt_builder  = PromptBuilder(
            scenario=scenario,
            role=role,
            name=name,
            personality=personality,
            attributes=attributes,
            revealed_clues=revealed_clues,
            backstory=backstory,
            history=history,
            question= self.player_question
        )

        messages = prompt_builder.build_message_list()
        raw_answer = self.ollama.ask_ollama(messages)

        cleaned_answer = CluesReveal.process_ia_reveal_clue_from_text(
            response_text=raw_answer,
            player=self.player,
            session=self.session
        )

        return cleaned_answer
