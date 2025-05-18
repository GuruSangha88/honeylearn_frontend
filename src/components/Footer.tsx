
import { Link } from "react-router-dom";
import { TermsOfServiceLink } from "./auth/AuthLinks";
import { PrivacyPolicyLink } from "./auth/AuthLinks";

const Footer = () => {
  return (
    <footer className="bg-tutor-dark-gray mt-auto py-8 border-t border-gray-800">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-tutor-purple font-semibold mb-4">HoneyLearn</h3>
            <p className="text-gray-400 text-sm">
              Equipping the next generation with the life skills schools forget.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-tutor-purple font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <TermsOfServiceLink />
              </li>
              <li>
                <PrivacyPolicyLink />
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} HoneyLearn. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
