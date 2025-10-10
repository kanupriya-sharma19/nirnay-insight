import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  Mail,
  User as UserIcon,
  Building,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match (only for signup)
    if (password && confirmPassword && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "The passwords you entered do not match. Please try again.",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Login Successful",
        description: "Welcome to NIRNAY Platform",
      });

      // 🔹 Navigate based on selected role
      if (role === "user") navigate("/researcher");
      else if (role === "reviewer") navigate("/apex");
      else if (role === "naccer") navigate("/NACCER");
      else navigate("/NACCER");

      setIsLoading(false);
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Coal Themed Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Coal Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/image.png")',
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/60"></div>

          {/* Coal Pattern Overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-gray-800 to-gray-900 mix-blend-overlay"></div>
          </div>
        </div>

        {/* Floating Elements with Coal Theme */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gray-800/30 rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute top-40 right-32 w-24 h-24 bg-gray-700/30 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-40 w-40 h-40 bg-gray-900/30 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 right-20 w-28 h-28 bg-gray-800/30 rounded-full blur-2xl animate-float"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8">
            <div className="bg-gray-800/40 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-700/50">
              <Shield className="h-24 w-24 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 text-center text-white">
            NIRNAY
          </h1>
          <p className="text-xl mb-2 text-center text-gray-200">
            National Intelligent Research & Development
          </p>
          <p className="text-lg text-center text-gray-300">
            Network for Analytical Year-round Yield
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px w-12 bg-orange-600"></div>
            <div className="h-px w-12 bg-white"></div>
            <div className="h-px w-12 bg-green-600"></div>
          </div>
          <p className="mt-6 text-center text-gray-300 max-w-md">
            AI-Powered R&D Proposal Evaluation System under Ministry of Coal,
            Government of India
          </p>
          <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
            <p className="text-sm text-gray-300 text-center">
              Empowering coal research and innovation through advanced AI
              evaluation
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary">NIRNAY</h1>
                <p className="text-xs text-muted-foreground">
                  Ministry of Coal
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-lg border-2">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-primary">
                Welcome
              </CardTitle>
              <CardDescription>
                Sign in to access the NIRNAY evaluation platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Register</TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={role}
                        onValueChange={(value) => setRole(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Researcher</SelectItem>
                          <SelectItem value="naccer">
                            NaCCER Official
                          </SelectItem>
                          <SelectItem value="reviewer">
                            Expert Reviewer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={toggleLoginPasswordVisibility}
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-muted-foreground">
                          Remember me
                        </span>
                      </label>
                      <a href="#" className="text-accent hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Sign Up Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Dr. Ram Kunar"
                          className="pl-10"
                          maxLength={50}
                          required
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Select Title</Label>
                      <Select>
                        <SelectTrigger id="title" className="w-full">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dr.">Dr.</SelectItem>
                          <SelectItem value="Mr.">Mr.</SelectItem>
                          <SelectItem value="Ms.">Ms.</SelectItem>
                          <SelectItem value="Prof.">Prof.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Qualification */}
                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification *</Label>
                      <Input
                        id="qualification"
                        placeholder="Ph.D. in Computer Science"
                        maxLength={100}
                        required
                      />
                    </div>

                    {/* Designation */}
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input
                        id="designation"
                        placeholder="Assistant Professor"
                        maxLength={50}
                        required
                      />
                    </div>

                    {/* Organization */}
                    <div className="space-y-2">
                      <Label htmlFor="organization">
                        Name of the Organization *
                      </Label>
                      <Input
                        id="organization"
                        placeholder="IIT Delhi"
                        maxLength={50}
                        required
                      />
                    </div>

                    {/* Research Interest */}
                    <div className="space-y-2">
                      <Label htmlFor="research">Research Interest Area *</Label>
                      <Input
                        id="research"
                        placeholder="Artificial Intelligence, ML"
                        maxLength={100}
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">E-mail ID *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="abc@example.com"
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    {/* Contact Number */}
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact No. *</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="8888999900"
                        maxLength={15}
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Re-enter Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {confirmPassword && password !== confirmPassword && (
                        <p className="text-xs text-red-500">Passwords do not match</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg"
                      disabled={isLoading}
                    >
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>
                  Need help? Contact{" "}
                  <a
                    href="mailto:support@nirnay.gov.in"
                    className="text-gray-700 hover:underline font-medium"
                  >
                    support@nirnay.gov.in
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-2 text-center text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}