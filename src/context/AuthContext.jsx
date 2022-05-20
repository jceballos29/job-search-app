import React, { createContext, useState } from "react";

export const authContext = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    loading: false,
  });

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
