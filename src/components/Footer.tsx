
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-brand-green font-bold text-xl">FoodShare</span>
              <span className="text-brand-orange font-bold text-xl">Hub</span>
            </Link>
            <p className="mt-2 text-sm text-gray-600">
              Connecting food donors with those in need to reduce waste and fight hunger.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-green-dark">Home</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-brand-green-dark">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-brand-green-dark">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Contact Us</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">
                Email: info@foodsharehub.org
              </li>
              <li className="text-gray-600">
                Phone: (555) 123-4567
              </li>
              <li className="text-gray-600">
                Address: 123 Sharing St, Foodville
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600 text-center">
            &copy; {currentYear} FoodShareHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
