
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface DonationFormProps {
  onSubmit: (donation: any) => void;
}

const DonationForm = ({ onSubmit }: DonationFormProps) => {
  const [donation, setDonation] = useState({
    name: "",
    description: "",
    quantity: "",
    expiry: "",
    location: "",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9" // Default image
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...donation,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "available",
      donorId: 1, // Mock donor ID
      donorName: "Green Grocers" // Mock donor name
    });
    // Reset the form
    setDonation({
      name: "",
      description: "",
      quantity: "",
      expiry: "",
      location: "",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donate Food</CardTitle>
        <CardDescription>
          Please provide details about the food you wish to donate.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Food Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g., Fresh Vegetables"
              value={donation.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the food items in detail"
              value={donation.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                name="quantity"
                placeholder="e.g., 5kg, 10 boxes"
                value={donation.quantity}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input
                id="expiry"
                name="expiry"
                type="date"
                value={donation.expiry}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Pickup Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g., 123 Main St, City"
              value={donation.location}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark">
            Submit Donation
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DonationForm;
