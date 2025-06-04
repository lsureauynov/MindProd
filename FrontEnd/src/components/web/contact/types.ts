export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export type SubjectOption = {
  value: string;
  label: string;
};

export const SUBJECT_OPTIONS: SubjectOption[] = [
  { value: 'question', label: 'Question générale' },
  { value: 'bug', label: 'Signalement de bug' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'other', label: 'Autre' },
]; 