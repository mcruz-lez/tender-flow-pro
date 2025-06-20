import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Support = () => {
  return (
    <PageTemplate
      title="Contact Support"
      description="Get help, submit a ticket, or reach our support team."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">For technical support, feature requests, or account issues, please use one of the following methods:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Email: <a href="mailto:support@tendprocure.com" className="text-blue-600 underline">support@tendprocure.com</a></li>
            <li>Phone: <a href="tel:+1234567890" className="text-blue-600 underline">+1 (234) 567-890</a></li>
            <li>Submit a ticket: <a href="/help/ticket" className="text-blue-600 underline">Support Ticket Form</a></li>
          </ul>
          <Button asChild variant="outline">
            <a href="/help/feature-requests">Submit Feature Request</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Support;
