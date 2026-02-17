import { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hook/useAxiosInstance";
import Loader from "../../SharedPages/Loader";

const TraceParcel = () => {
  const axiosSecure = useAxiosSecure();
  const [trackingId, setTrackingId] = useState("");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!trackingId) {
      return Swal.fire("Oops!", "Enter a tracking ID", "warning");
    }

    setLoading(true);
    setRecords([]);

    try {
      const res = await axiosSecure.get(`/tracking/${trackingId}`);
      setRecords(res.data);
    } catch (err) {
      Swal.fire(
        "Not Found",
        err.response?.data?.message || "Invalid Tracking ID",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Track Your Parcel
      </h2>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-2 justify-center mb-10">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          className="input input-bordered w-full sm:w-96"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <button
          onClick={handleTrack}
          className="btn btn-primary bg-blue-500 gap-2"
        >
          <FaSearch /> Track
        </button>
      </div>

      {/* LOADER */}
      {loading && <Loader></Loader>}

      {/* TIMELINE */}
      {records.length > 0 && (
        <div className="relative">
          {/* CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-indigo-500 -translate-x-1/2"></div>

          <div className="space-y-10">
            {records.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={item._id}
                  className={`flex flex-col px-0 md:px-10 md:flex-row ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  } relative`}
                >
                  {/* DOT */}
                  <div className="hidden md:block absolute left-1/2 top-6 w-4 h-4 bg-indigo-600 rounded-full -translate-x-1/2 z-10"></div>

                  {/* CARD */}
                  <div
                    className={`bg-white shadow-md rounded-lg p-5 w-full md:w-[35%] ${
                      isLeft ? "md:mr-auto " : "md:ml-auto "
                    }`}
                  >
                    <h3 className="flex items-center gap-2 font-semibold text-indigo-600 text-lg">
                      <FaMapMarkerAlt />
                      {item.status}
                    </h3>

                    <p className="text-gray-600 mt-1">{item.details}</p>

                    <div className="flex flex-col  gap-3 text-sm text-gray-500 mt-3">
                      <span className="flex  gap-1">
                        <FaClock />
                        {new Date(item.time).toLocaleString()}
                      </span>

                      <span className="flex gap-1">
                        <FaUser />
                        {item.updated_by}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default TraceParcel;
