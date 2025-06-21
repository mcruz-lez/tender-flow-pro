import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const stories = [
  {
    title: "Acme Corp Streamlines Procurement",
    summary:
      "Acme Corp reduced procurement cycle time by 40% using TendProcure's automation tools.",
    author: "Procurement Lead, Acme Corp",
  },
  {
    title: "Vendor Collaboration Success",
    summary:
      "Improved vendor relationships and compliance tracking for a global manufacturer.",
    author: "COO, Global Manufacturing Inc.",
  },
  {
    title: "Seamless Document Management",
    summary:
      "A property management firm achieved full digital transformation with secure document workflows.",
    author: "IT Director, PropManage Solutions",
  },
];

const SuccessStories = () => {
  return (
    <PageTemplate
      title="Success Stories"
      description="Customer success stories and case studies"
    >
      <div className="space-y-6">
        {stories.map((story, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <CardTitle>{story.title}</CardTitle>
              <div className="text-gray-700 mb-2">{story.summary}</div>
              <div className="text-gray-500 text-sm">{story.author}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default SuccessStories;
