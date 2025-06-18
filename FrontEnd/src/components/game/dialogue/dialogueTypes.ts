export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'character';
  timestamp: Date;
}

export interface DialogueCharacter {
  name: string;
  image_url: string;
  role: 'Suspect' | 'Witness';
  personality: string;
  backstory: string;
  story: string;
}

export interface DialogueState {
  messages: Message[];
  character: DialogueCharacter;
}

