export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'character';
  timestamp: Date;
}

export interface DialogueCharacter {
  id: string;
  name: string;
  image: string;
  type: 'suspect' | 'witness';
  description: string;
  backstory: string;
}

export interface DialogueState {
  messages: Message[];
  character: DialogueCharacter;
} 