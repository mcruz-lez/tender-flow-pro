import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";

const endpoints = [
  { name: "List Tenders", url: "/api/tenders" },
  { name: "Submit Bid", url: "/api/bids" },
  { name: "Get Vendors", url: "/api/vendors" },
];

const APIDocs = () => {
  return (
    <PageTemplate
      title="API Documentation"
      description="Comprehensive API documentation and developer resources"
    >
      <ul className="space-y-2 mb-6">
        {endpoints.map((e, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>{e.name}</span>
            <Button asChild size="sm" variant="secondary">
              <a href={e.url} target="_blank" rel="noopener noreferrer">
                View Docs
              </a>
            </Button>
          </li>
        ))}
      </ul>
      <div className="text-gray-500 text-sm">
        For full API reference, see the official documentation portal.
      </div>
    </PageTemplate>
  );
};

export default APIDocs;
