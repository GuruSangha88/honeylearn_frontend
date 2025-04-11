
import { Heart, Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-tutor-dark-gray mt-auto border-t border-gray-800">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-tutor-purple font-semibold mb-3">HoneyLearn</h3>
            <p className="text-sm text-gray-400">
              Making learning fun and engaging for kids through interactive lessons
              and personalized feedback.
            </p>
          </div>
          
          <div>
            <h3 className="text-tutor-purple font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/curriculum" className="text-gray-400 hover:text-white transition-colors">
                  Curriculum
                </Link>
              </li>
              <li>
                <Link to="/parents" className="text-gray-400 hover:text-white transition-colors">
                  Parent Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-tutor-purple font-semibold mb-3">Contact Us</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a href="mailto:support@honeylearn.com" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Mail size={16} />
                support@honeylearn.com
              </a>
              <a href="https://github.com/honeylearn" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                <Github size={16} />
                @honeylearn
              </a>
              <p className="flex items-center gap-2 text-gray-400 mt-4">
                <Heart size={16} className="text-tutor-purple" />
                Made with love for kids
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} HoneyLearn. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
