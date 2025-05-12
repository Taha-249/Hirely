"use client";

import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  role: null,               // "user" | "company" | "admin"
  userId: null,
  name: null,
  email: null,
  authToken: null,
  setUserContext: () => {},
  clearUserContext: () => {},
};

const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }) => {
  const [userContext, setUserContextState] = useState(defaultContext);

  const setUserContext = (data) => {
    setUserContextState((prev) => ({
      ...prev,
      ...data,
    }));
    localStorage.setItem("user", JSON.stringify(data))
  };

  const clearUserContext = () => {
    setUserContextState(defaultContext);
    localStorage.removeItem("user")
  };

  return (
    <UserContext.Provider value={{ ...userContext, setUserContext, clearUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
