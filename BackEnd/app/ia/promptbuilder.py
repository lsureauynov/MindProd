class PromptBuilder:
    def __init__(self, scenario, role, personality, attributes, revealed_clues, question, history):
        self.scenario = scenario
        self.role = role
        self.personality = personality
        self.attributes = attributes
        self.revealed_clues = revealed_clues
        self.question = question
        self.history = history or ""

    def build(self):
        attributes_text = "\n".join([f"- {name}: {desc}" for name, desc in self.attributes]) if self.attributes else "None"
        clues_text = "\n".join([f"- {desc}" for desc in self.revealed_clues]) if self.revealed_clues else "None"
        history_text = self.history if self.history else ""

    prompt = (
        "### CONTEXTE DE L'ENQUÊTE ###\n"
        f"{self.scenario}\n\n"

        "### RÔLE DU PERSONNAGE ###\n"
        f"{self.role}\n\n"

        "### PERSONNALITÉ ###\n"
        f"{self.personality}\n\n"

        "### BACKSTORY ET INTENTIONS ###\n"
        f"{self.backstory}\n\n"

        "### CONNAISSANCES DU PERSONNAGE ###\n"
        f"{attributes_text}\n\n"

        "### INDICES QU'IL PEUT RÉVÉLER SI BIEN INTERROGÉ ###\n"
        f"{clues_text}\n\n"

        "### HISTORIQUE DE LA CONVERSATION ###\n"
        f"{history_text}\n\n"

        "### QUESTION POSÉE PAR LE JOUEUR ###\n"
        f"{self.question}\n\n"

        "### INSTRUCTIONS DE COMPORTEMENT ###\n"
        "- RÉPONDS UNIQUEMENT EN TANT QUE CE PERSONNAGE, PAR DU DIALOGUE DIRECT.\n"
        "- Ne décris pas ses gestes, émotions ou comportements.\n"
        "- RESTE DANS LE RÔLE À TOUT MOMENT.\n"
        "- S'il est indiqué que le personnage peut mentir dans la backstory, il peut le faire mais SEULEMENT dans ce cas.\n"
        "- Si le personnage dit la vérité, il doit rester COHÉRENT avec ce qu'il sait.\n"
        "- PAS d'explication ou de metacommentaires.\n"
        "- UTILISE LE FRANÇAIS UNIQUEMENT.\n"
        "- SOIS CRÉDIBLE, FLUIDE ET HUMAIN.\n"
        "- CRITICAL: Repond avec un json valide seulement."
    )
    return prompt
