
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [myReservations, setMyReservations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Simulate fetching data from the "database"
  useEffect(() => {
    // Filter only available donations
    const available = mockFoodData.filter(item => item.status === "available");
    setAvailableDonations(available);

    // For demo purposes, assume the receiver ID is 2
    const receiverId = 2;
    const reserved = mockFoodData.filter(
      item => item.status === "reserved" && item.receiverId === receiverId
    );
    setMyReservations(reserved);
  }, []);

  const handleReserve = (id: number) => {
    // Update the donation status (in a real app, this would be an API call)
    const updatedAvailable = availableDonations.filter(item => item.id !== id);
    const reservedItem = availableDonations.find(item => item.id === id);
    
    if (reservedItem) {
      const updatedItem = {
        ...reservedItem,
        status: "reserved",
        receiverId: 2, // Mock receiver ID
        receiverName: "Hope Shelter" // Mock receiver name
      };
      
      setAvailableDonations(updatedAvailable);
      setMyReservations(prev => [updatedItem, ...prev]);
      
      toast({
        title: "Food Reserved!",
        description: `You have successfully reserved ${reservedItem.name}`,
      });
    }
  };

  const handleCancelReservation = (id: number) => {
    // Update the donation status (in a real app, this would be an API call)
    const updatedReservations = myReservations.filter(item => item.id !== id);
    const canceledItem = myReservations.find(item => item.id === id);
    
    if (canceledItem) {
      const updatedItem = {
        ...canceledItem,
        status: "available",
        receiverId: undefined,
        receiverName: undefined
      };
      
      setMyReservations(updatedReservations);
      setAvailableDonations(prev => [updatedItem, ...prev]);
      
      toast({
        title: "Reservation Canceled",
        description: `You have canceled your reservation for ${canceledItem.name}`,
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
              Find and request food donations from local providers.
            </p>
          </div>
          
          <Tabs defaultValue="available">
            <TabsList className="mb-8">
              <TabsTrigger value="available">Available Donations</TabsTrigger>
              <TabsTrigger value="reserved">My Reservations</TabsTrigger>
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
                      onReserve={handleReserve}
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
            
            <TabsContent value="reserved">
              {myReservations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {myReservations.map((donation) => (
                    <FoodCard 
                      key={donation.id} 
                      {...donation} 
                      onCancel={handleCancelReservation}
                    />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-10 text-center">
                    <p className="text-gray-500">
                      You haven't reserved any donations yet. Browse the available donations to make a reservation.
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
