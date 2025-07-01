
import React, { useContext, useState } from 'react';
import { PromptContext } from './PromptContext';
import { loadPrompt } from './PromptLoader';

const AIChatbot: React.FC = () => {
  const { language, promptType, setPromptType } = useContext(PromptContext);
  const [userInput, setUserInput] = useState('');
  const [chat, setChat] = useState<Array<{ sender: string; message: string }>>([]);
  const [loading, setLoading] = useState(false);

  // Load the selected prompt markdown (sync for now, async if needed)
  const promptMarkdown = loadPrompt(promptType, language);

  const handleSend = async () => {
    if (!userInput.trim()) return;
    setChat([...chat, { sender: 'user', message: userInput }]);
    setLoading(true);
    // TODO: Integrate with backend/LLM API
    setTimeout(() => {
      setChat((prev) => [
        ...prev,
        { sender: 'ai', message: `Echo: ${userInput}` },
      ]);
      setLoading(false);
    }, 800);
    setUserInput('');
  };

  return (
    <div className="ai-chatbot-container">
      <div className="prompt-header">
        <h2>AI Assistant</h2>
        <select value={promptType} onChange={e => setPromptType(e.target.value as any)}>
          <option value="onboarding">Onboarding</option>
          <option value="faq">FAQ</option>
          <option value="blog">Blog</option>
          <option value="vendor_commands">Vendor Commands</option>
          <option value="contract_negotiation">Contract Negotiation</option>
          <option value="dispute_resolution">Dispute Resolution</option>
        </select>
        <select value={language} disabled>
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
      <div className="prompt-markdown">
        <pre style={{ whiteSpace: 'pre-wrap' }}>{promptMarkdown}</pre>
      </div>
      <div className="chat-window">
        {chat.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.sender}`}>{msg.message}</div>
        ))}
        {loading && <div className="chat-msg ai">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
};

export default AIChatbot;
