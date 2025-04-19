
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn, Home, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-brand-green font-bold text-2xl">FoodShare</span>
              <span className="text-brand-orange font-bold text-2xl">Hub</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-medium flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              {isLoggedIn ? (
                <>
                  <Link to="/donor" className="text-gray-600 hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-medium">
                    Donor Dashboard
                  </Link>
                  <Link to="/receiver" className="text-gray-600 hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-medium">
                    Receiver Dashboard
                  </Link>
                  <Link to="/admin" className="text-gray-600 hover:text-brand-green-dark px-3 py-2 rounded-md text-sm font-medium">
                    Admin
                  </Link>
                  <Button 
                    variant="outline" 
                    className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
                    onClick={() => navigate("/")}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white flex items-center"
                    onClick={() => navigate("/login")}
                  >
                    <LogIn className="w-4 h-4 mr-1" />
                    Login
                  </Button>
                  <Button 
                    className="bg-brand-green hover:bg-brand-green-dark text-white flex items-center"
                    onClick={() => navigate("/register")}
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-brand-green-dark focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/donor" 
                  className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Donor Dashboard
                </Link>
                <Link 
                  to="/receiver" 
                  className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Receiver Dashboard
                </Link>
                <Link 
                  to="/admin" 
                  className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Admin
                </Link>
                <button
                  className="w-full text-left text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => {
                    navigate("/");
                    toggleMenu();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="text-gray-600 hover:text-brand-green-dark block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
