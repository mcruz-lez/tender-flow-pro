import React from 'react';
import { PromptProvider } from './PromptContext';
import AIChatbot from './AIChatbot';

const AIChatbotRoot: React.FC = () => (
  <PromptProvider>
    <AIChatbot />
  </PromptProvider>
);

export default AIChatbotRoot;
