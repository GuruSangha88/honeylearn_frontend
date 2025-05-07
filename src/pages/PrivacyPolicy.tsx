
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">HoneyLearn Privacy Policy</h1>
      <p className="text-gray-500 mb-6">Effective Date: January 2, 2025</p>
      
      <p className="mb-6">
        HoneyLearn ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy describes how we collect, 
        use, and protect the information of users ("you" or "your") who access our educational platform and services, 
        including parents and their children.
      </p>
      
      <p className="mb-6 font-medium">
        We are fully compliant with the Children's Online Privacy Protection Act (COPPA) and take special care in handling children's personal information.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">1. Information We Collect</h2>
        <p className="mb-2">We collect information in the following ways:</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">a. Information You Provide</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium">Parent/Guardian Information:</span> When you create an account, we collect your name, email address, and payment details.</li>
          <li><span className="font-medium">Child Information:</span> When you create a child profile, we may collect a first name or nickname and the child's age or age range. We do not collect sensitive identifiers such as full names, addresses, or contact info for children.</li>
        </ul>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">b. Payment Information</h3>
        <p>
          All payments are processed securely by a third-party payment processor. We do not store credit card numbers or sensitive billing details on our servers.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">c. Automatically Collected Data</h3>
        <p>
          We may collect device type, browser type, IP address, pages visited, and usage activity to improve functionality and user experience.
        </p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">d. Cookies and Tracking Technologies</h3>
        <p className="mb-2">We use cookies and similar technologies to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Maintain login sessions</li>
          <li>Understand how our platform is used</li>
          <li>Improve learning experience and performance</li>
        </ul>
        <p className="mt-2">
          You can disable cookies through your browser, but this may impact your experience on the site.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">2. How We Use Your Information</h2>
        <p className="mb-2">We use your information to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide access to our platform</li>
          <li>Deliver personalized learning experiences</li>
          <li>Process payments and manage subscriptions</li>
          <li>Respond to inquiries and provide customer support</li>
          <li>Ensure platform security and integrity</li>
          <li>Comply with legal requirements</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">3. How We Protect Children's Privacy</h2>
        <p className="mb-2">We do not:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Allow children to create accounts on their own</li>
          <li>Collect personal contact information directly from children</li>
          <li>Display third-party advertising to children</li>
        </ul>
        <p className="mt-2">
          All data related to children is limited, anonymized when possible, and managed exclusively by the parent or legal guardian.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">4. Data Sharing</h2>
        <p className="mb-2">
          We do not sell or rent your personal information. We may share information only with:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service providers who help us operate the platform (e.g., hosting, payments)</li>
          <li>Law enforcement or regulators if required by law or legal process</li>
          <li>In the event of a business transfer, such as a merger or acquisition, with appropriate safeguards</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">5. Data Retention</h2>
        <p>
          We retain account and usage information for as long as necessary to provide our services or as required by law. 
          You may request deletion of your account and associated data at any time by contacting us at{' '}
          <a href="mailto:support@honeylearn.com" className="text-blue-500 hover:underline">support@honeylearn.com</a>.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">6. Your Rights and Choices</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium">Access and Correction:</span> You may view and update your information in your account settings.</li>
          <li><span className="font-medium">Delete Child Data:</span> You may delete your child's profile at any time.</li>
          <li><span className="font-medium">Opt-Out of Marketing:</span> We do not send promotional emails to children. Parents can opt-out of email communications.</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">7. Third-Party Links</h2>
        <p>
          Our platform may include links to educational resources or platforms. We are not responsible for the privacy practices of third-party sites.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">8. Security</h2>
        <p>
          We use industry-standard measures to protect your data, including encryption, firewalls, and secure servers. 
          No method of transmission is 100% secure, but we work hard to protect your information.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date." 
          We encourage you to review the policy periodically.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy or your data, please contact us at:<br />
          Email: <a href="mailto:support@honeylearn.com" className="text-blue-500 hover:underline">support@honeylearn.com</a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
