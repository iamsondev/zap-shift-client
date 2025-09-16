import axios from "axios";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  useEffect(() => {
    const auth = getAuth();

    let unsubscribe;
    let tokenCache = null; // ✅ একবার token আনলে cache করে রাখছি

    unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        tokenCache = await currentUser.getIdToken(true);
        console.log("🔑 Token cached:", tokenCache);
      } else {
        tokenCache = null;
      }
    });

    const requestIntercept = axiosSecure.interceptors.request.use(
      async (config) => {
        if (tokenCache) {
          config.headers.Authorization = `Bearer ${tokenCache}`;
        } else {
          console.warn("⚠ No token available — request sent without token");
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 403) {
          console.error("🚫 403 Forbidden: Token invalid or insufficient permissions");
        } else if (error.response?.status === 401) {
          console.error("⛔ 401 Unauthorized: Please log in again");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      if (unsubscribe) unsubscribe();
      axiosSecure.interceptors.request.eject(requestIntercept);
      axiosSecure.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
