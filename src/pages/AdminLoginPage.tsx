import { useState } from "react";
import { SignInCard } from "@/components/ui/sign-in-card-2";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLoginPage = () => {
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (user: string, pass: string) => {
    setLoading(true);
    // Mimic network delay for that premium feel
    setTimeout(() => {
      const success = loginAsAdmin(user, pass);
      if (success) {
        toast.success("Welcome back, TechZone Admin");
        navigate("/techzone-portal-cms");
      } else {
        toast.error("Invalid credentials. Access denied.");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <SignInCard onLogin={handleLogin} isLoading={loading} />
    </div>
  );
};

export default AdminLoginPage;
