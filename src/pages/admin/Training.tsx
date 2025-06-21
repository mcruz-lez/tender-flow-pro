import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const modules = [
  { name: "Onboarding Basics", completed: true },
  { name: "Tender Management", completed: false },
  { name: "Vendor Evaluation", completed: false },
];

const Training = () => {
  const [training, setTraining] = useState(modules);

  const markComplete = (idx: number) => {
    setTraining(
      training.map((m, i) => (i === idx ? { ...m, completed: true } : m)),
    );
  };

  return (
    <PageTemplate
      title="Training Management"
      description="Manage user training programs and resources"
    >
      <ul className="mb-6 space-y-2">
        {training.map((m, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between rounded border bg-gray-50 p-2"
          >
            <span>{m.name}</span>
            {m.completed ? (
              <span className="font-medium text-green-600">Completed</span>
            ) : (
              <Button size="sm" onClick={() => markComplete(idx)}>
                Mark Complete
              </Button>
            )}
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default Training;
