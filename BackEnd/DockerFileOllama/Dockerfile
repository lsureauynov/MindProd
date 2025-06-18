FROM ollama/ollama

USER root

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

COPY DockerFileOllama/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 11434

ENTRYPOINT ["/entrypoint.sh"]
