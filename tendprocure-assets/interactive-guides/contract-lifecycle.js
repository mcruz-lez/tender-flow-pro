const stages = [
  { title: 'Drafting', desc: 'Create and review contract drafts.' },
  { title: 'Review', desc: 'Internal and legal review of contract terms.' },
  { title: 'Approval', desc: 'Obtain necessary approvals from stakeholders.' },
  { title: 'Execution', desc: 'Sign and execute the contract.' },
  { title: 'Monitoring', desc: 'Track milestones, KPIs, and compliance.' },
  { title: 'Amendments', desc: 'Manage changes and addenda.' },
  { title: 'Renewal/Closure', desc: 'Renew or close out the contract.' }
];
let idx = 0;
const stepsEl = document.getElementById('lifecycle-steps');
function render() {
  stepsEl.innerHTML = `<h2>${stages[idx].title}</h2><p>${stages[idx].desc}</p>`;
}
document.getElementById('next').onclick = () => { if (idx < stages.length-1) idx++; render(); };
document.getElementById('prev').onclick = () => { if (idx > 0) idx--; render(); };
render();
