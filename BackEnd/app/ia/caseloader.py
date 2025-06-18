class CaseLoader:
    def __init__(self, character):
        self.character = character
        self.story = character.story

    def get_story_scenario(self):
        return self.story.scenario.scenario

    def get_character_personality(self):
        return self.character.personality

    def get_character_role(self):
        return self.character.get_role_id_display()

    def get_character_backstory(self):
        return self.character.backstory

    def get_character_attributes(self):
        from game.models.character_attribute import CharacterAttribute
        attributes = CharacterAttribute.objects.filter(character=self.character)
        return [(attr.clue.name, attr.clue.description) for attr in attributes]

    def get_character_revealed_clues(self):
        from game.models.characters_reveal_clue import CharactersRevealClue
        clues_links = CharactersRevealClue.objects.filter(character=self.character)
        return [link.clue.description for link in clues_links]


