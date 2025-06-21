import PageTemplate from "@/components/PageTemplate";

const TermsOfService = () => (
  <PageTemplate
    title="Terms of Service"
    description="The rules and guidelines for using our platform."
  >
    <div className="prose max-w-2xl mx-auto">
      <h2>Acceptance of Terms</h2>
      <p>By using this platform, you agree to these terms and conditions.</p>
      <h3>Use of Service</h3>
      <ul>
        <li>Do not misuse the platform or attempt unauthorized access.</li>
        <li>Respect intellectual property and privacy rights.</li>
        <li>Comply with all applicable laws and regulations.</li>
      </ul>
      <h3>Account Responsibilities</h3>
      <ul>
        <li>Keep your account credentials secure.</li>
        <li>Notify us of any unauthorized use.</li>
      </ul>
      <h3>Limitation of Liability</h3>
      <ul>
        <li>We are not liable for indirect or consequential damages.</li>
        <li>Service is provided "as is" without warranties.</li>
      </ul>
      <h3>Contact</h3>
      <p>
        For questions, email{" "}
        <a
          href="mailto:support@tendprocure.com"
          className="text-blue-600 underline"
        >
          support@tendprocure.com
        </a>
        .
      </p>
    </div>
  </PageTemplate>
);

export default TermsOfService;
