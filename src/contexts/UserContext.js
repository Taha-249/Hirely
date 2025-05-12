import { createContext, useContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUserContextState((prev) => ({ ...prev, ...parsed }));
    }
  }, []);

  const setUserContext = (data) => {
    setUserContextState((prev) => ({
      ...prev,
      ...data,
    }));
    localStorage.setItem("user", JSON.stringify(data))
    localStorage.setItem("token", "yes")
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
