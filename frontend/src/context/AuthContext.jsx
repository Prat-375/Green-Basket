import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("green-basket-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("green-basket-token") || "";
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("green-basket-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("green-basket-user");
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("green-basket-token", token);
    } else {
      localStorage.removeItem("green-basket-token");
    }
  }, [token]);

  function login(data) {
    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}