import os
import requests
from dotenv import load_dotenv
import json

load_dotenv()


def parse_answer(response):
    full_response = ""
    for line in response.iter_lines():
        if line:
            try:
                chunk = json.loads(line.decode("utf-8"))
                full_response += chunk.get("response", "")
            except json.JSONDecodeError:
                continue

    return full_response.strip()


class Ollama:
    def __init__(self):
        self.model = os.getenv('OLLAMA_MODEL_NAME')
        self.api_url = os.getenv('OLLAMA_URL')

    #def ask_ollama(self, prompt):
        #    headers = {'Content-Type': 'application/json'}
        #payload = {
            #'model': self.model,
            #'prompt': prompt,
            #'stream': True
        #}
        #response = requests.post(self.api_url, headers=headers, json=payload, stream=True)
        #response.raise_for_status()

        #return parse_answer(response)

    def ask_ollama(self, prompt):
        headers = {'Content-Type': 'application/json'}
        payload = {
            'model': self.model,
            'prompt': prompt,
            'stream': False  # test sans stream
        }
        response = requests.post(self.api_url, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        print("Response data:", data)  # Debug ici
        return data["response"].strip()


