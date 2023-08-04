import { useCallback, useState, useEffect } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [tokenExp, setTokenExp] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExp(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExp(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token) {
      const remainingTime = tokenExp.getTime() - new Date();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExp]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token && new Date(data.expiration) > new Date()) {
      login(data.userId, data.token, new Date(data.expiration));
    }
  }, [login]);

  return { token, userId, login, logout };
};
