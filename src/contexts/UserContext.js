"use client";

import React, { createContext, useContext, useState } from "react";

const defaultContext = {
  role: null,               // "user" | "company" | "admin"
  userId: null,
  name: null,
  email: null,
  degreeOrField: null,
  experienceLevel: null,    // "fresher" | "junior" | "mid" | "senior" | "lead"
  preferredJobTypes: [],
  skills: [],
  location: null,
  interests: [],
  authToken: null,
  setUserContext: () => {},
};

const UserContext = createContext(defaultContext);

export const UserProvider = ({ children }) => {
  const [userContext, setUserContextState] = useState(defaultContext);

  const setUserContext = (data) => {
    setUserContextState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <UserContext.Provider value={{ ...userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
