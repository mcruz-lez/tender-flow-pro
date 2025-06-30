import React, { createContext, useState, ReactNode } from 'react';

export type PromptType =
  | 'onboarding'
  | 'faq'
  | 'blog'
  | 'vendor_commands'
  | 'contract_negotiation'
  | 'dispute_resolution';

export type Language = 'en' | 'fr';

interface PromptContextProps {
  promptType: PromptType;
  setPromptType: (type: PromptType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const PromptContext = createContext<PromptContextProps>({
  promptType: 'onboarding',
  setPromptType: () => {},
  language: 'en',
  setLanguage: () => {},
});

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const [promptType, setPromptType] = useState<PromptType>('onboarding');
  const [language, setLanguage] = useState<Language>('en');

  return (
    <PromptContext.Provider value={{ promptType, setPromptType, language, setLanguage }}>
      {children}
    </PromptContext.Provider>
  );
};
