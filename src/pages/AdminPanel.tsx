
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FoodCard from "@/components/FoodCard";
import UserCard from "@/components/UserCard";

// Import mock data
import mockFoodData from "@/data/foodData.json";
import mockUserData from "@/data/userData.json";

const AdminPanel = () => {
  const [donations, setDonations] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [searchDonations, setSearchDonations] = useState("");
  const [searchUsers, setSearchUsers] = useState("");

  // Simulate fetching data from the "database"
  useEffect(() => {
    setDonations(mockFoodData);
    setUsers(mockUserData);
  }, []);

  const filteredDonations = donations.filter(
    item => 
      item.name.toLowerCase().includes(searchDonations.toLowerCase()) ||
      item.description.toLowerCase().includes(searchDonations.toLowerCase()) ||
      item.donorName.toLowerCase().includes(searchDonations.toLowerCase())
  );

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUsers.toLowerCase()) ||
      user.role.toLowerCase().includes(searchUsers.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Manage donations, users, and platform operations.
              </p>
            </div>
            <div className="mt-4 md:mt-0 space-x-3 flex">
              <Badge className="px-3 py-1">Admin Access</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-brand-green mb-2">
                  {donations.length}
                </div>
                <p className="text-gray-600">Total Donations</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-brand-orange mb-2">
                  {users.length}
                </div>
                <p className="text-gray-600">Registered Users</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-blue-500 mb-2">
                  {donations.filter(d => d.status === "reserved").length}
                </div>
                <p className="text-gray-600">Successful Matches</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="donations">
            <TabsList className="mb-8">
              <TabsTrigger value="donations">Manage Donations</TabsTrigger>
              <TabsTrigger value="users">Manage Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donations" className="space-y-8">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="search"
                  placeholder="Search donations..."
                  className="pl-10"
                  value={searchDonations}
                  onChange={(e) => setSearchDonations(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDonations.map((donation) => (
                  <FoodCard 
                    key={donation.id} 
                    {...donation} 
                    userRole="admin"
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="search"
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchUsers}
                    onChange={(e) => setSearchUsers(e.target.value)}
                  />
                </div>
                <Button className="bg-brand-green hover:bg-brand-green-dark">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New User
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} {...user} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminPanel;
