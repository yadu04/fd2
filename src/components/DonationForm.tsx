import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ImagePlus, Clock } from "lucide-react";

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
    pickupBefore: "",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setDonation(prev => ({
          ...prev,
          image: imageUrl
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...donation,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "available",
      donorId: 1,
      donorName: "Green Grocers"
    });
    setDonation({
      name: "",
      description: "",
      quantity: "",
      expiry: "",
      location: "",
      pickupBefore: "",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    });
    setPreviewImage(null);
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
            <Label htmlFor="foodImage">Food Image</Label>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full h-48 border-2 border-dashed rounded-lg overflow-hidden">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Food preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-gray-50">
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload food image</p>
                  </div>
                )}
                <Input
                  id="foodImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

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
            
            <div className="space-y-2">
              <Label htmlFor="pickupBefore" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pickup Before
              </Label>
              <Input
                id="pickupBefore"
                name="pickupBefore"
                type="time"
                value={donation.pickupBefore}
                onChange={handleChange}
                required
                className="w-full"
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
