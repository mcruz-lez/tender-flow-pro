import React, { useEffect } from 'react';

const stages = [
  { title: 'Drafting', desc: 'Create and review contract drafts.' },
  { title: 'Review', desc: 'Internal and legal review of contract terms.' },
  { title: 'Approval', desc: 'Obtain necessary approvals from stakeholders.' },
  { title: 'Execution', desc: 'Sign and execute the contract.' },
  { title: 'Monitoring', desc: 'Track milestones, KPIs, and compliance.' },
  { title: 'Amendments', desc: 'Manage changes and addenda.' },
  { title: 'Renewal/Closure', desc: 'Renew or close out the contract.' }
];

export const ContractLifecycleGuide: React.FC = () => {
  const [idx, setIdx] = React.useState(0);

  useEffect(() => {
    document.title = 'Contract Lifecycle Management | TendProcure';
  }, []);

  return (
    <div className="bg-white max-w-xl mx-auto p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-navy">Contract Lifecycle Management</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{stages[idx].title}</h2>
        <p>{stages[idx].desc}</p>
      </div>
      <div className="flex justify-between">
        <button
          className="bg-slate-400 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          disabled={idx === 0}
        >Back</button>
        <button
          className="bg-cyan-500 text-white px-4 py-2 rounded disabled:opacity-50"
          onClick={() => setIdx(i => Math.min(stages.length - 1, i + 1))}
          disabled={idx === stages.length - 1}
        >Next</button>
      </div>
    </div>
  );
};

export default ContractLifecycleGuide;
