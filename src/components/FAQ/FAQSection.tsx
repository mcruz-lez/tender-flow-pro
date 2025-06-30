import React from 'react';

const faqs = [
  {
    q: 'How do I create a tender?',
    a: 'Go to Tender Management → New Tender, fill in details, attach docs, then Submit.'
  },
  {
    q: 'How do I submit a bid?',
    a: 'Navigate to the relevant tender, click Submit Bid, upload your documents, and confirm.'
  },
  {
    q: 'How do I register as a vendor?',
    a: 'Visit the Vendor & Contractor Hub, complete the registration form, and upload required documents.'
  },
  {
    q: 'How do I manage contracts?',
    a: 'Access the Contract Management section to view, sign, and track contract milestones.'
  },
  {
    q: 'Where can I find help?',
    a: 'Check this FAQ, the Help & Support page, or contact support@tendprocure.com.'
  }
];

export const FAQSection: React.FC = () => {
  const [open, setOpen] = React.useState<number | null>(null);
  return (
    <section className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-navy">Frequently Asked Questions</h2>
      <dl>
        {faqs.map((item, i) => (
          <React.Fragment key={i}>
            <dt
              className="font-semibold mt-4 cursor-pointer text-cyan-700"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {item.q}
            </dt>
            <dd className={`ml-4 ${open === i ? 'block' : 'hidden'}`}>{item.a}</dd>
          </React.Fragment>
        ))}
      </dl>
    </section>
  );
};

export default FAQSection;
