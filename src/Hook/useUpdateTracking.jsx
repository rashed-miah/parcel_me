import useAxiosSecure from "./useAxiosInstance";

const useUpdateTracking = () => {
  const axiosSecure = useAxiosSecure();

  const updateTracking = async ({
    trackingId,
    status,
    details,
    updated_by,
  }) => {
    try {
      const res = await axiosSecure.post("/tracking/update", {
        trackingId,
        status,
        details,
        updated_by,
      });

      return res.data;
    } catch (error) {
      console.error("Tracking update failed:", error);
      throw error;
    }
  };

  return { updateTracking };
};

export default useUpdateTracking;
