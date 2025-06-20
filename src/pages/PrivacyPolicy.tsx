import PageTemplate from "@/components/PageTemplate";

const PrivacyPolicy = () => (
  <PageTemplate title="Privacy Policy" description="How we protect your data and privacy.">
    <div className="prose max-w-2xl mx-auto">
      <h2>Introduction</h2>
      <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
      <h3>Information We Collect</h3>
      <ul>
        <li>Account and profile information</li>
        <li>Usage and analytics data</li>
        <li>Payment and transaction details</li>
      </ul>
      <h3>How We Use Information</h3>
      <ul>
        <li>To provide and improve our services</li>
        <li>To process payments securely</li>
        <li>To communicate with you about your account</li>
      </ul>
      <h3>Your Rights</h3>
      <ul>
        <li>Access, update, or delete your data</li>
        <li>Opt out of marketing communications</li>
        <li>Request data portability</li>
      </ul>
      <h3>Contact</h3>
      <p>For privacy questions, email <a href="mailto:support@tendprocure.com" className="text-blue-600 underline">support@tendprocure.com</a>.</p>
    </div>
  </PageTemplate>
);

export default PrivacyPolicy;
