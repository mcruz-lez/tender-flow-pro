import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const resources = [
  {
    title: "Getting Started Guide",
    description: "Step-by-step onboarding for new users.",
    link: "/docs/getting-started",
  },
  {
    title: "Bid Submission Tutorial",
    description: "How to submit and track bids in the platform.",
    link: "/docs/bid-tutorial",
  },
  {
    title: "Document Management Overview",
    description: "Best practices for secure document workflows.",
    link: "/docs/document-management",
  },
  {
    title: "Video Training: Platform Tour",
    description: "Watch a walkthrough of all major features.",
    link: "https://www.youtube.com/watch?v=example",
  },
];

const TrainingResources = () => {
  return (
    <PageTemplate
      title="Training Resources"
      description="Access training materials and courses"
    >
      <div className="space-y-6">
        {resources.map((res, idx) => (
          <Card key={idx}>
            <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between p-6">
              <div>
                <CardTitle>{res.title}</CardTitle>
                <div className="text-gray-700 mb-2">{res.description}</div>
              </div>
              <Button asChild size="sm" variant="outline">
                <a href={res.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default TrainingResources;
