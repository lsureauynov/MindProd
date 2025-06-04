import { useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';
import type { ContactForm, ContactFormErrors } from '../types';

const INITIAL_FORM_STATE: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactForm>(INITIAL_FORM_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const toast = useToast();

  const validateForm = useCallback(() => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est requis';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez corriger les erreurs dans le formulaire.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Ici, vous pouvez ajouter l'appel à votre API pour envoyer l'email
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: 'Message envoyé !',
        description: 'Nous vous répondrons dans les plus brefs délais.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'envoi du message.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return {
    formData,
    isLoading,
    errors,
    handleSubmit,
    handleChange,
  };
}; 