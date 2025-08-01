import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";
import FoodCard from "@/components/FoodCard";
import DonorBadges from "@/components/DonorBadges";
import NotificationBell from "@/components/notifications/NotificationBell";
import RequestsList from "@/components/notifications/RequestsList";

import mockFoodData from "@/data/foodData.json";

const DonorDashboard = () => {
  const [myDonations, setMyDonations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("donate");
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const donorId = 1;
    const baseDonations = mockFoodData.filter(item => item.donorId === donorId);
    const newDonationsString = localStorage.getItem('newDonations');
    let allDonations = [...baseDonations];
    
    if (newDonationsString) {
      try {
        const newDonations = JSON.parse(newDonationsString);
        const myNewDonations = newDonations.filter((item: any) => item.donorId === donorId);
        allDonations = [...baseDonations, ...myNewDonations];
      } catch (e) {
        console.error("Error parsing new donations:", e);
      }
    }
    
    setMyDonations(allDonations);

    // Set up refresh interval to check for new notifications
    const intervalId = setInterval(() => {
      const notificationsString = localStorage.getItem('notifications');
      if (notificationsString) {
        try {
          const notifications = JSON.parse(notificationsString);
          // Update the notification bell if there are new notifications
          if (notifications.length > 0) {
            // Force a re-render of the notification bell
            setLastUpdate(Date.now());
          }
        } catch (e) {
          console.error("Error parsing notifications:", e);
        }
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId);
  }, [lastUpdate]);

  const handleNewDonation = (donation: any) => {
    setMyDonations(prev => [donation, ...prev]);
    let newDonations = [];
    const newDonationsString = localStorage.getItem('newDonations');
    
    if (newDonationsString) {
      try {
        newDonations = JSON.parse(newDonationsString);
      } catch (e) {
        console.error("Error parsing new donations:", e);
      }
    }
    
    newDonations.push(donation);
    localStorage.setItem('newDonations', JSON.stringify(newDonations));
    
    toast({
      title: "Donation Posted!",
      description: "Your food donation has been posted successfully and is now available for receivers.",
    });
    
    setActiveTab("donations");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Manage your food donations and see the impact you're making.
              </p>
            </div>
            <NotificationBell />
          </div>
          
          <div className="mb-8">
            <DonorBadges 
              donationCount={myDonations.length} 
              reviewScore={4.5}
            />
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="donate">Donate Food</TabsTrigger>
              <TabsTrigger value="donations">My Donations</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
              <TabsTrigger value="impact">My Impact</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donate" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <DonationForm onSubmit={handleNewDonation} />
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Donation Tips</CardTitle>
                      <CardDescription>
                        Guidelines for effective food donations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 list-disc list-inside text-sm text-gray-600">
                        <li>Clearly describe the food items you're donating</li>
                        <li>Include accurate expiration dates</li>
                        <li>Provide detailed pickup instructions</li>
                        <li>Donate food that is still fresh and safe to consume</li>
                        <li>Package food properly to maintain quality</li>
                        <li>Respond promptly to reservation requests</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="donations">
              {myDonations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {myDonations.map((donation) => (
                    <FoodCard 
                      key={donation.id} 
                      {...donation} 
                      userRole="donor"
                      donorId={1}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-gray-500">
                      You haven't posted any donations yet. Create your first donation!
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="requests">
              <RequestsList />
            </TabsContent>
            
            <TabsContent value="impact">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-brand-green mb-2">
                      {myDonations.length}
                    </div>
                    <p className="text-gray-600">Total Donations</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-brand-green mb-2">
                      {myDonations.filter(d => d.status === "reserved").length}
                    </div>
                    <p className="text-gray-600">Items Claimed</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-brand-green mb-2">
                      2
                    </div>
                    <p className="text-gray-600">Organizations Helped</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-4xl font-bold text-brand-green mb-2">
                      25 kg
                    </div>
                    <p className="text-gray-600">Food Saved</p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Your Donation Impact</CardTitle>
                  <CardDescription>
                    How your contributions are making a difference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <p className="text-gray-600">
                      Your generous donations have helped reduce food waste and provided meals 
                      to those in need. Thank you for your continued support in our mission to 
                      create a sustainable food sharing ecosystem.
                    </p>
                    
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Top Recipients</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <span>Hope Shelter</span>
                          <span className="text-brand-green font-medium">3 items</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Children's Center</span>
                          <span className="text-brand-green font-medium">1 item</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DonorDashboard;
