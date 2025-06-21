import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Ticket = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <PageTemplate
      title="Submit a Support Ticket"
      description="Describe your issue and our team will assist you."
    >
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Support Ticket Form</CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-green-600 font-medium mt-4">
              Your ticket has been submitted. Our support team will contact you
              soon.
            </div>
          ) : (
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <input
                className="w-full border rounded p-2"
                required
                placeholder="Your Email"
                type="email"
              />
              <input
                className="w-full border rounded p-2"
                required
                placeholder="Subject"
              />
              <textarea
                className="w-full border rounded p-2"
                required
                placeholder="Describe your issue..."
                rows={4}
              />
              <Button type="submit">Submit Ticket</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Ticket;
