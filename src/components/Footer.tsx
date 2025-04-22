
import { Link } from "react-router-dom";

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
                <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link to="/parents" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Parent Dashboard
                </Link>
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
