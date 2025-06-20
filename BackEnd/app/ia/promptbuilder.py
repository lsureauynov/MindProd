class PromptBuilder:
    def __init__(self, scenario, backstory, role,name, personality, attributes, revealed_clues, history, question):
        self.scenario = scenario
        self.role = role
        self.name = name
        self.personality = personality
        self.attributes = attributes
        self.revealed_clues = revealed_clues
        self.backstory =backstory
        self.history = history or []
        self.question = question



    def build_system_prompt(self):
        attributes_text = "\n".join([f"- {name}: {desc}" for name, desc in self.attributes]) if self.attributes else "None"
        clues_text = "\n".join([f"- {desc}" for desc in self.revealed_clues]) if self.revealed_clues else "None"

        return (
            "[INSTRUCTIONS DE COMPORTEMENT]\n"
            "- Tu incarnes le rôle d'un personnage dans une enquête policière.\n"
            "Tu es interrogé par un enquêteur et tu dois UNIQUEMENT répondre à ses questions.\n"
            "- Ne décris pas tes gestes, émotions ou comportements.\n"
            "- Ne dévoile JAMAIS tes intentions. \n"
            "- Ne parle jamais directement du meurtre ou du cadavre. \n"
            "- RESTE DANS LE RÔLE À TOUT MOMENT.\n"
            "- S'il est indiqué que tu peux mentir dans la backstory, tu peux le faire mais SEULEMENT dans ce cas.\n"
            "- Si tu dis la vérité, tu dois rester COHÉRENT avec ce que tu sais.\n"
            "- Ne mentionne JAMAIS que tu ne peux pas répondre à une question. Trouve une alternative crédible. \n"
            "- PAS d'explication ou de metacommentaires.\n"
            "- Réponds en FRANÇAIS uniquement.\n"
            "- SOIS NATUREL, ET HUMAIN. \n"
            "- Ne parle JAMAIS du fait que tu es une IA.\n"
            "- Réponds toujours en trois phrases maximum. \n"
            "- Réponds toujours à la première personne du singulier. \n\n"

            "[CONTEXTE DE L'ENQUÊTE]\n"
            f"{self.scenario}\n\n"

            "[NOM DU PERSONNAGE]\n"
            f"{self.name}\n\n"
            
            "[RÔLE DU PERSONNAGE]\n"
            f"{self.role}\n\n"

            "[PERSONNALITÉ]\n"
            f"{self.personality}\n\n"

            "[BACKSTORY ET INTENTIONS]\n"
            f"{self.backstory}\n\n"

            "[CONNAISSANCES DU PERSONNAGE]\n"
            f"{attributes_text}\n\n"

            "[INDICES QU'IL PEUT RÉVÉLER SI BIEN INTERROGÉ]\n"
            f"{clues_text}\n"
        )

    def format_history(self):
        return [
            {"role": "user", "content": d["player_question"]} if isinstance(d, dict) and "player_question" in d else {
                "role": "user", "content": d["content"]}
            if d["role"] == "user" else
            {"role": "assistant", "content": d["character_answer"]} if isinstance(d,
                                                                                  dict) and "character_answer" in d else {
                "role": "assistant", "content": d["content"]}
            for d in self.history
        ]

    def get_user_message(self):
        return {"role": "user", "content": self.question}

    def build_message_list(self):
        return [{"role": "system", "content": self.build_system_prompt()}] + self.format_history() + [self.get_user_message()]


