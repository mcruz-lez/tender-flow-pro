import React, { useEffect } from 'react';

const steps = [
  { title: 'Basic Info', content: 'Enter tender title, description, and details.' },
  { title: 'Attachments', content: 'Upload documents & get AI suggestions.' },
  { title: 'Workflow', content: 'Set approval stages & notifications.' },
];

export const TenderWizard: React.FC = () => {
  const [current, setCurrent] = React.useState(0);

  useEffect(() => {
    document.title = 'Tender Creation Wizard | TendProcure';
  }, []);

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-navy">Create New Tender</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{steps[current].title}</h2>
        <p>{steps[current].content}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-slate-400 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setCurrent(c => Math.max(0, c - 1))}
          disabled={current === 0}
        >Back</button>
        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))}
          disabled={current === steps.length - 1}
        >Next</button>
      </div>
    </div>
  );
};

export default TenderWizard;
