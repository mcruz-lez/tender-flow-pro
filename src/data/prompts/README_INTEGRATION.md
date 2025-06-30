/*
  This file documents the onboarding, FAQ, and blog markdown integration for TendProcure.
  - All markdowns are in /src/data/prompts/
  - Used by the AI assistant and onboarding/FAQ/blog UI.

# Markdown Files
- onboarding_en.md, onboarding_fr.md
- faq_en.md, faq_fr.md
- blog_template_en.md, blog_template_fr.md
- assistant_vendor_commands.md
- assistant_contract_negotiation.md
- assistant_dispute_resolution.md
- prompt_header.md (super trait preamble)

# Usage
- The AI assistant loads these markdowns based on user context (language, prompt type).
- Pages/components can import and render markdown as needed.

# Best Practices
- Keep markdowns up to date with product features and super trait philosophy.
- Reference prompt_header.md in all new prompt templates.
