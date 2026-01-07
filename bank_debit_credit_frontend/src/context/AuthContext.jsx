import { createContext, useState } from "react";
import { login as loginAPI, signup as signupAPI } from "../api/auth.api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  const login = async (email, password) => {
    try {
      const res = await loginAPI(email, password);
      localStorage.setItem("token", res.data.access_token);
      setUser({ token: res.data.access_token, email });
      return true;
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || err.message));
      return false;
    }
  };

  const signup = async (data) => {
    try {
      await signupAPI(data);
      alert("Signup successful! Please login.");
      return true;
    } catch (err) {
      alert("Signup failed: " + (err.response?.data?.detail || err.message));
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
