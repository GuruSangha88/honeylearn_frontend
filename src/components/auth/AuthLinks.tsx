
import { Link } from 'react-router-dom';

export const TermsOfServiceLink = () => (
  <Link 
    to="/terms" 
    className="text-blue-500 hover:underline"
    target="_blank"
  >
    Terms of Service
  </Link>
);

export const PrivacyPolicyLink = () => (
  <Link 
    to="/privacy" 
    className="text-blue-500 hover:underline"
    target="_blank"
  >
    Privacy Policy
  </Link>
);
