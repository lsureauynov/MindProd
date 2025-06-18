#!/bin/bash

ollama serve &

until curl -s http://localhost:11434 > /dev/null; do
    echo "En attente du serveur Ollama..."
    sleep 1
done

echo "⬇Téléchargement du modèle llama3.2..."
ollama pull llama3.2

wait -n
