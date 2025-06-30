import fs from 'fs';
import path from 'path';
import { PromptType, Language } from './PromptContext';

// Map promptType and language to file names
const promptFileMap: Record<PromptType, Record<Language, string>> = {
  onboarding: {
    en: 'onboarding_en.md',
    fr: 'onboarding_fr.md',
  },
  faq: {
    en: 'faq_en.md',
    fr: 'faq_fr.md',
  },
  blog: {
    en: 'blog_template_en.md',
    fr: 'blog_template_fr.md',
  },
  vendor_commands: {
    en: 'assistant_vendor_commands.md',
    fr: 'assistant_vendor_commands.md', // fallback to EN if FR not available
  },
  contract_negotiation: {
    en: 'assistant_contract_negotiation.md',
    fr: 'assistant_contract_negotiation.md', // fallback to EN if FR not available
  },
  dispute_resolution: {
    en: 'assistant_dispute_resolution.md',
    fr: 'assistant_dispute_resolution.md', // fallback to EN if FR not available
  },
};

export function loadPrompt(promptType: PromptType, language: Language): string {
  try {
    const fileName = promptFileMap[promptType][language];
    // Use dynamic import for prompts (works in modern environments)
    // Note: This must be async if using import()
    const promptPath = path.resolve(__dirname, '../../data/prompts', fileName);
    return fs.readFileSync(promptPath, 'utf-8');
  } catch (e) {
    return 'Prompt not found.';
  }
}
