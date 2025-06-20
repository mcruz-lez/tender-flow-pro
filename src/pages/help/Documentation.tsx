import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const docs = [
  { title: "API Reference", link: "/admin/api-docs" },
  { title: "User Guide", link: "/docs/user-guide" },
  { title: "Integration Guide", link: "/docs/integration" },
  { title: "FAQ", link: "/help/faq" },
];

const Documentation = () => {
  return (
    <PageTemplate
      title="Documentation"
      description="Browse guides, API docs, and resources."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={doc.link} className="text-blue-600 underline">View {doc.title}</a>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default Documentation;
