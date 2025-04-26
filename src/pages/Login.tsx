
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import userData from "@/data/userData.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Find user in our mock data
    const user = userData.find(u => 
      u.email === email && 
      u.role === role // Check if role matches
    );

    if (user) {
      // In a real app, we would verify the password here
      toast({
        title: "Login successful!",
        description: "Welcome back to FoodShareHub.",
      });
      setIsLoading(false);
      navigate(`/${role}`); // Navigate based on role
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials or role. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center font-bold">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials below to login to your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <RadioGroup
                    value={role}
                    onValueChange={setRole}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="donor" id="donor" />
                      <Label htmlFor="donor" className="cursor-pointer">Food Donor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="receiver" id="receiver" />
                      <Label htmlFor="receiver" className="cursor-pointer">Food Receiver</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {role === "donor" ? (
                    <p className="text-sm text-muted-foreground mt-1">
                      Try: contact@greengrocers.com
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">
                      Try: info@hopeshelter.org
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-brand-green hover:text-brand-green-dark"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    For demo, any password will work
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  type="submit"
                  className="w-full bg-brand-green hover:bg-brand-green-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don't have an account?{" "}
                  <Link
                    to={`/register?role=${role}`}
                    className="font-medium text-brand-green hover:text-brand-green-dark"
                  >
                    Register
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
