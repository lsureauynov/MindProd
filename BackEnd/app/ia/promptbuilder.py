class PromptBuilder:
    def __init__(self, scenario, role, personality, backstory, attributes, revealed_clues, question, history):
        self.scenario = scenario
        self.role = role
        self.personality = personality
        self.backstory = backstory
        self.attributes = attributes
        self.revealed_clues = revealed_clues
        self.question = question
        self.history = history or ""

    def build(self):
        attributes_text = "\n".join([f"- {name}: {desc}" for name, desc in self.attributes]) if self.attributes else "None"
        clues_text = "\n".join([f"- {desc}" for desc in self.revealed_clues]) if self.revealed_clues else "None"
        history_text = self.history if self.history else ""

        prompt = (
            f"Scenario:\n{self.scenario}\n\n"
            f"Character Role: {self.role}\n"
            f"Personality:\n{self.personality}\n\n"
            f"Backstory:\n{self.backstory}\n\n"
            f"Known Attributes:\n{attributes_text}\n\n"
            f"Clues that can be revealed:\n{clues_text}\n\n"
            f"Player's question:\n{self.question}\n\n"
            f"History of the conversation:\n{history_text}\n\n"
            "Answer as this character would, staying in character and respecting their personality, role, and knowledge."
        )
        return prompt
