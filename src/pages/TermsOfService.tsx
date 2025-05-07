
import { Separator } from "@/components/ui/separator";

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-2">HoneyLearn Terms and Conditions</h1>
      <p className="text-gray-500 mb-6">Effective Date: January 2, 2025</p>
      
      <p className="mb-6">
        Please read these Terms and Conditions ("Terms") carefully before using the HoneyLearn platform ("HoneyLearn", "we", "us", or "our"). 
        These Terms govern your access to and use of our educational platform, which provides paid digital content and services primarily for children aged 5–12, with parental oversight.
      </p>
      
      <p className="mb-6 font-medium">
        By accessing or using HoneyLearn, you agree to be bound by these Terms. If you do not agree with these Terms, do not use the platform.
      </p>

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">1. Overview of Services</h2>
        <p>
          HoneyLearn is a subscription-based educational platform offering interactive lessons, games, and real-life challenges 
          designed to teach kids life skills in areas such as leadership, money, productivity, and personal growth.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">2. Eligibility and Parent/Guardian Consent</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Children under the age of 13 may only use HoneyLearn with a parent or legal guardian's consent and supervision.</li>
          <li>The parent or guardian must create the account and is solely responsible for all activity under that account.</li>
          <li>By creating an account, you affirm that you are at least 18 years old and legally able to enter into this agreement.</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">3. Subscription and Payment Terms</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><span className="font-medium">Free Trial:</span> HoneyLearn offers a 7-day free trial to new users. You will not be charged during the trial period.</li>
          <li><span className="font-medium">Billing:</span> After the 7-day free trial ends, your subscription will automatically convert to a paid subscription at $9.99 per month unless canceled before the trial ends.</li>
          <li><span className="font-medium">Recurring Payments:</span> Payments are billed monthly and will continue to be charged to your payment method on a recurring basis unless you cancel.</li>
          <li><span className="font-medium">No Refunds:</span> All payments are non-refundable, including partial months, unused features, or if you fail to cancel before your renewal date.</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">4. Cancellation</h2>
        <p>
          You may cancel your subscription at any time through your account settings. Cancellations will take effect at the end of the current billing cycle. 
          You will retain access to HoneyLearn until the end of your current period.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">5. User Conduct and Responsibilities</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>You agree to use HoneyLearn for lawful, educational purposes only.</li>
          <li>You agree not to copy, redistribute, reverse-engineer, or misuse any part of the HoneyLearn platform or its content.</li>
          <li>You agree not to allow unauthorized access to your account or share login credentials.</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">6. Intellectual Property</h2>
        <p>
          All content on HoneyLearn, including but not limited to lessons, videos, games, challenges, branding, and design, is the intellectual property of HoneyLearn 
          and its licensors. You are granted a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial use only.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">7. Modifications and Termination</h2>
        <p>
          HoneyLearn reserves the right to modify, suspend, or terminate the platform or your access to it at any time, with or without notice, 
          especially for violation of these Terms. We may also update pricing or features with reasonable notice.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">8. Disclaimer and Limitation of Liability</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>HoneyLearn is provided "as is" and "as available" without warranties of any kind.</li>
          <li>We do not guarantee that the platform will be error-free, uninterrupted, or that the educational outcomes will meet your expectations.</li>
          <li>To the fullest extent permitted by law, HoneyLearn shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</li>
        </ul>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">9. Privacy</h2>
        <p>
          Use of the platform is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">10. Governing Law</h2>
        <p>
          These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
        </p>
      </section>

      <Separator className="my-4" />

      <section className="mb-6">
        <h2 className="text-xl font-bold mb-2">11. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:<br />
          Email: <a href="mailto:support@honeylearn.com" className="text-blue-500 hover:underline">support@honeylearn.com</a>
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
