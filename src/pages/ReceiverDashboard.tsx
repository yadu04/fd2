import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";

// Import mock data
import mockFoodData from "@/data/foodData.json";

const ReceiverDashboard = () => {
  const [availableDonations, setAvailableDonations] = useState<any[]>([]);
  const [myClaims, setMyClaims] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  // Simulate fetching data from the "database"
  useEffect(() => {
    // Get all donations including those just added by donors
    const allMockData = [...mockFoodData];
    
    // Check localStorage for any new donations from donors
    const newDonationsString = localStorage.getItem('newDonations');
    let newDonations: any[] = [];
    
    if (newDonationsString) {
      try {
        newDonations = JSON.parse(newDonationsString);
        // Combine with mock data
        allMockData.push(...newDonations);
      } catch (e) {
        console.error("Error parsing new donations:", e);
      }
    }
    
    // Get current claims from localStorage
    const currentClaimsString = localStorage.getItem('currentClaims');
    let currentClaims: any[] = [];
    
    if (currentClaimsString) {
      try {
        currentClaims = JSON.parse(currentClaimsString);
      } catch (e) {
        console.error("Error parsing current claims:", e);
      }
    }
    
    // Filter out any items that are currently claimed
    const available = allMockData.filter(item => {
      // Check if the item is in current claims
      const isClaimed = currentClaims.some(claim => claim.id === item.id);
      return item.status === "available" && !isClaimed;
    });
    
    setAvailableDonations(available);

    // For demo purposes, assume the receiver ID is 2
    const receiverId = 2;
    const claimed = currentClaims.length > 0 
      ? currentClaims 
      : allMockData.filter(
          item => item.status === "claimed" && item.receiverId === receiverId
        );
    setMyClaims(claimed);
    
    // Set up refresh interval to check for new donations
    const intervalId = setInterval(() => {
      setLastUpdate(Date.now());
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [lastUpdate]);

  const handleClaim = (id: number) => {
    // Find the donation item
    const donationItem = availableDonations.find(item => item.id === id);
    
    if (donationItem) {
      // Update the donation status
      const updatedAvailable = availableDonations.filter(item => item.id !== id);
      const claimedItem = {
        ...donationItem,
        status: "claimed",
        receiverId: 2, // Mock receiver ID
        receiverName: "Hope Shelter" // Mock receiver name
      };
      
      setAvailableDonations(updatedAvailable);
      setMyClaims(prev => [claimedItem, ...prev]);
      
      // Update localStorage to persist between pages
      const newDonationsString = localStorage.getItem('newDonations');
      if (newDonationsString) {
        try {
          const newDonations = JSON.parse(newDonationsString);
          const updatedDonations = newDonations.map((item: any) => 
            item.id === id ? { ...item, status: "claimed", receiverId: 2, receiverName: "Hope Shelter" } : item
          );
          localStorage.setItem('newDonations', JSON.stringify(updatedDonations));
        } catch (e) {
          console.error("Error updating claim in localStorage:", e);
        }
      }
      
      // Store current claims in localStorage
      const currentClaims = [...myClaims, claimedItem];
      localStorage.setItem('currentClaims', JSON.stringify(currentClaims));

      // Create notification for the donor
      const notificationsString = localStorage.getItem('notifications');
      let notifications = [];
      if (notificationsString) {
        try {
          notifications = JSON.parse(notificationsString);
        } catch (e) {
          console.error("Error parsing notifications:", e);
        }
      }

      // Create new notification
      const newNotification = {
        id: Date.now(),
        message: `Your food donation "${claimedItem.name}" has been claimed by ${claimedItem.receiverName}`,
        type: "claim",
        read: false,
        timestamp: new Date().toISOString(),
        foodId: id,
        foodName: claimedItem.name,
        quantity: claimedItem.quantity,
        location: claimedItem.location,
        receiverName: claimedItem.receiverName
      };
      
      notifications.unshift(newNotification);
      localStorage.setItem('notifications', JSON.stringify(notifications));
      
      toast({
        title: "Food Claimed!",
        description: `You have successfully claimed ${donationItem.name}`,
      });
    }
  };

  const handleCancelClaim = (id: number) => {
    // Update the donation status
    const updatedClaims = myClaims.filter(item => item.id !== id);
    const canceledItem = myClaims.find(item => item.id === id);
    
    if (canceledItem) {
      const updatedItem = {
        ...canceledItem,
        status: "available",
        receiverId: undefined,
        receiverName: undefined
      };
      
      setMyClaims(updatedClaims);
      setAvailableDonations(prev => [updatedItem, ...prev]);
      
      // Update localStorage to persist between pages
      const newDonationsString = localStorage.getItem('newDonations');
      if (newDonationsString) {
        try {
          const newDonations = JSON.parse(newDonationsString);
          const updatedDonations = newDonations.map((item: any) => 
            item.id === id ? { ...item, status: "available", receiverId: undefined, receiverName: undefined } : item
          );
          localStorage.setItem('newDonations', JSON.stringify(updatedDonations));
        } catch (e) {
          console.error("Error updating cancelled claim in localStorage:", e);
        }
      }
      
      // Update current claims in localStorage
      localStorage.setItem('currentClaims', JSON.stringify(updatedClaims));
      
      toast({
        title: "Claim Canceled",
        description: `You have canceled your claim for ${canceledItem.name}`,
      });
    }
  };

  // Filter available donations based on search query
  const filteredDonations = availableDonations.filter(
    item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Receiver Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Find and claim food donations from local providers.
            </p>
          </div>
          
          <Tabs defaultValue="available">
            <TabsList className="mb-8">
              <TabsTrigger value="available">Available Donations</TabsTrigger>
              <TabsTrigger value="claimed">My Claims</TabsTrigger>
            </TabsList>
            
            <TabsContent value="available" className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search donations by name, description, or donor..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {filteredDonations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredDonations.map((donation) => (
                    <FoodCard 
                      key={donation.id} 
                      {...donation} 
                      onReserve={handleClaim}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-gray-500">
                      {searchQuery
                        ? "No donations match your search criteria. Try different keywords."
                        : "There are no available donations at the moment. Please check back later."}
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="claimed">
              {myClaims.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {myClaims.map((donation) => (
                    <FoodCard 
                      key={donation.id} 
                      {...donation} 
                      onCancel={handleCancelClaim}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-gray-500">
                      You haven't claimed any donations yet. Browse the available donations to make a claim.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReceiverDashboard;
