const steps = [
  { title: 'Basic Info', render: () => `<p>Enter tender title, description...</p>` },
  { title: 'Attachments', render: () => `<p>Upload documents & AI suggestions...</p>` },
  { title: 'Workflow', render: () => `<p>Set approval stages & notifications...</p>` }
];
let current = 0;
const stepsEl = document.getElementById('steps');
function render() {
  stepsEl.innerHTML = `<h2>${steps[current].title}</h2>` + steps[current].render();
}
document.getElementById('next').onclick = () => { if (current < steps.length-1) current++; render(); };
document.getElementById('prev').onclick = () => { if (current > 0) current--; render(); };
render();
