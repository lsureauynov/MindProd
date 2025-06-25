import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()


class NebiLLM:
    def __init__(self):
        self.model = os.getenv('NEBIUS_MODEL_NAME', 'meta-llama/Meta-Llama-3.1-8B-Instruct')
        self.client = OpenAI(
            base_url="https://api.studio.nebius.com/v1/",
            api_key=os.getenv("NEBIUS_API_KEY")
        )

    def ask(self, prompt):
        response = self.client.chat.completions.create(
            model=self.model,
            max_tokens=512,
            temperature=0.6,
            top_p=0.9,
#            repeat_penalty=1.0,
#            extra_body={"top_k": 50},
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
