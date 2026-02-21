import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Demo users for testing
const DEMO_USERS = [
  { id: 1, name: "Demo User", email: "demo@salene.com", password: "demo123", phone: "555-0001" },
  { id: 2, name: "Test User", email: "test@salene.com", password: "test123", phone: "555-0002" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("salene_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse saved user:", err);
        localStorage.removeItem("salene_user");
      }
    }
    setLoading(false);
  }, []);

  const register = async (name, email, password, phone) => {
    // Check if email already exists
    const existingUser = DEMO_USERS.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("Email already in use.");
    }

    // Create new demo user
    const newUser = {
      id: DEMO_USERS.length + 1,
      name,
      email,
      password,
      phone,
    };
    DEMO_USERS.push(newUser);

    // Log in the new user (without password in state)
    const loggedInUser = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone };
    setUser(loggedInUser);
    localStorage.setItem("salene_user", JSON.stringify(loggedInUser));

    return loggedInUser;
  };

  const login = async (email, password) => {
    // Find user by email
    const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error("Invalid email or password.");
    }

    // Log in user (without password in state)
    const loggedInUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email, phone: foundUser.phone };
    setUser(loggedInUser);
    localStorage.setItem("salene_user", JSON.stringify(loggedInUser));

    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("salene_user");
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
