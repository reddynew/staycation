import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [islogin, setIsLogIn] = useState(false);


  useEffect(() => {
    console.log("🟢 isloggedin changed:", islogin);
  }, [islogin]); // Logs whenever isloggedin changes

  const register=async(email,password)=>{
    try{
    console.log("register api")
    console.log(`email ${email} and password ${password}`)
    setIsLoading(true)
    setIsRegister(true)

    }
    catch(error)
    {
      console.log(`error ${error} in register`)
    }
  }

  const login = async (email, password) => {
    console.log("🔹 Login function called. isloggedin BEFORE:", islogin);
    setIsLoading(true);

    try {
      const response = await axios.get("http://localhost:3000/api/login");
      console.log("✅ Login API Response:", response.data);

      setUser({ id: 1, email, name: "hanuman reddy" });

      setIsLogIn(true); // This updates the state asynchronously
      console.log("🔹 setIsLoggedIn(true) called, but state is still old here");
      toast.success("Successfully logged in!");
    } catch (error) {
      toast.error("Failed to login");
      console.error("❌ Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("🔴 Logout function called");
    setUser(null);
    setIsLogIn(false);
    toast.success("Successfully logged out!");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, islogin,setIsLogIn,logout,register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
