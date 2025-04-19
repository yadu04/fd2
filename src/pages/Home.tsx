
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-brand-green">Sharing Food,</span> <span className="text-brand-orange">Building Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              FoodShareHub connects food donors with those in need, reducing waste and fighting hunger in our communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-6 text-lg">
                <Link to="/register?role=donor">I Want to Donate</Link>
              </Button>
              <Button asChild variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white px-8 py-6 text-lg">
                <Link to="/register?role=receiver">I Need Food</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center mb-4">
                <span className="text-brand-green-dark text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">
                Sign up as a food donor or receiver. Provide basic information about your organization or needs.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center mb-4">
                <span className="text-brand-green-dark text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">
                Donors post available food items, and receivers browse and request what they need.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-green-light flex items-center justify-center mb-4">
                <span className="text-brand-green-dark text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Share</h3>
              <p className="text-gray-600">
                Coordinate pickup or delivery of food items. Reduce waste and help those in need.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Stats */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">5,000+</div>
              <p className="text-gray-600">Meals Shared</p>
            </div>
            
            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">200+</div>
              <p className="text-gray-600">Active Donors</p>
            </div>
            
            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">150+</div>
              <p className="text-gray-600">Recipient Organizations</p>
            </div>
            
            {/* Stat 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">2 tons</div>
              <p className="text-gray-600">Food Waste Prevented</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Join our community today and help us create a world where good food never goes to waste.
          </p>
          <Button asChild className="bg-white text-brand-green hover:bg-gray-100 px-8 py-6 text-lg">
            <Link to="/register">Get Started Now</Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
