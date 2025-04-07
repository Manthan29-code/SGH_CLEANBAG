import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "@/utils/api";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => { },
  register: async () => { },
  logout: async () => { },
  checkUserAuthentication: async () => { },
});


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const checkUserAuthentication = async () => {
    try {
      const response = await api.get("/api/users/profile");
      setUser(response.data.user);
      setIsAuthenticated(true);

    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await api.post("/api/auth/login", credentials);
      console.log(response.data.user);
      setUser(response.data.user);
      setIsAuthenticated(true);

      toast.success("Welcome to CleanBage!", {
        style: {
          background: "#2D6A4F",
          color: "#FFFFFF",
        },
      });

      navigate('/');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid credentials";

      toast.error(errorMessage, {
        style: {
          background: "#DC2626",
          color: "#FFFFFF",
        },
      });

      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const response = await api.post("/api/auth/register", credentials);

      toast.success("Registration successful! Please login.", {
        style: {
          background: "#2D6A4F",
          color: "#FFFFFF",
        },
      });

      navigate("/login");
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";

      toast.error(errorMessage, {
        style: {
          background: "#DC2626",
          color: "#FFFFFF",
        },
      });

      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.get("/api/auth/logout");

      setUser(null);
      setIsAuthenticated(false);

      toast.success("Logged out successfully", {
        style: {
          background: "#2D6A4F",
          color: "#FFFFFF",
        },
      });

      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";

      toast.error(errorMessage, {
        style: {
          background: "#DC2626",
          color: "#FFFFFF",
        },
      });
    }
  };

  const updateProfile = async (updateData) => {
    try {
      const { data } = await api.put("/api/users/profile", updateData);

      if (data.success) {
        setUser(data.user);
        toast.success("Profile updated successfully!", {
          style: {
            background: "#2D6A4F",
            color: "#FFFFFF",
          },
        });
        return data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Profile update failed";

      toast.error(errorMessage, {
        style: {
          background: "#DC2626",
          color: "#FFFFFF",
        },
      });

      throw error;
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    checkUserAuthentication,
    isAdmin: user?.role === 'admin',
    isGarbageCollector: user?.role === 'garbage_collector',
    isResident: user?.role === 'resident',
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthProvider;