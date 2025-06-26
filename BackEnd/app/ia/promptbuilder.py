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
        clues_text = "\n".join([
            f"- id: {clue['id']}, description: {clue['description']}"
            for clue in self.revealed_clues
        ]) if self.revealed_clues else "None"

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
            "- Réponds toujours en cinq phrases maximum. \n"
            "- Réponds toujours à la première personne du singulier. \n"
            "- Chaque indice est associé à une ou plusieurs **conditions**. \n"
            "- Si la question de l’enquêteur correspond à une **condition** d’un indice, alors tu dois OBLIGATOIREMENT l'intégralité révéler cet indice. \n"
            "- Révéler un indice signifie remplir le champ 'indice_revele' avec l'identifiant correspondant, et répondre naturellement en intégrant cet indice dans ta réponse. \n"
            "- Tu ne peux révéler qu’un seul indice par réponse.\n"
            "- Si aucune condition n’est remplie, le champ 'indice_revele' doit être `null`.\n"
            
            "\n[EXEMPLE DE COMPORTEMENT ATTENDU]\n"
            "Voici un indice disponible :\n"
            "- id: \"b2d5ffc5-6127-452c-839c-a1da4f6f0eda\"\n"
            "- description: \"Un camion blanc est resté stationné anormalement longtemps dans la rue.\"\n"
            "- conditions: [\"Le joueur parle d’un véhicule suspect\", \"Le joueur demande qui était présent dans la rue\"]\n\n"

            "Si l'enquêteur pose la question : « Avez-vous vu quelque chose d’inhabituel dans la rue ce soir-là ? »,\n"
            "alors tu dois répondre par exemple :\n"
            "« Il y avait un camion blanc qui ne bougeait pas. C’était étrange. [indice_revele: indice_camion_stationne] »\n"

            "[FORMAT DE RÉPONSE]\n"
            "- Si tu révèles un indice, insère-le dans la réponse entre crochets comme ceci : [indice_revele: id_de_l_indice]\n"
            "- Exemple : « Je l’ai vu quitter la maison en courant. [indice_revele: 6b6a0f77-604f-4659-91b7-568c9585b36a] »\n"
            "- S’il n’y a pas d’indice à révéler, ne mets rien.\n\n"
            
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


