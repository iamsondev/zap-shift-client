import useAxiosSecure from "./useAxiosSecure";

const useTrackingLogger = () => {
  const { axiosSecure, token } = useAxiosSecure(); // ✅ token-aware axios

  // Log tracking event
  const logTracking = async ({ tracking_id, status, location, details, message }) => {
    if (!token) {
      console.warn("⚠ No token available — tracking log not sent");
      return { success: false, message: "No auth token" };
    }

    try {
      const res = await axiosSecure.post(`/tracking/${tracking_id}`, {
        status,
        location,
        details,
        message,
      });
      return res.data; // returns {success, history}
    } catch (err) {
      console.error("❌ Tracking log failed:", err);
      return { success: false, message: "Tracking log failed" };
    }
  };

  return { logTracking };
};

export default useTrackingLogger;
