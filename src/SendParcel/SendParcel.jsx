import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hook/useAuth";
import useAxiosInstance from "../Hook/useAxiosInstance";

const BD_PHONE_REGEX = /^(?:\+880|880|0)1[3-9]\d{8}$/;
// generate track id
const generateTrackingId = () => {
  const timestamp = Date.now(); // milliseconds
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BDP-${timestamp}-${random}`;
};

/* ---------- PRICE CALCULATOR ---------- */
const calculatePrice = ({
  parcelType,
  weight,
  senderDistrict,
  receiverDistrict,
}) => {
  const isWithinCity = senderDistrict === receiverDistrict;
  let base = 0;
  let extra = 0;

  if (parcelType === "document") {
    base = isWithinCity ? 60 : 80;
  } else {
    if (weight <= 3) {
      base = isWithinCity ? 110 : 150;
    } else {
      base = isWithinCity ? 110 : 150;
      extra += Math.ceil(weight - 3) * 40;
      if (!isWithinCity) extra += 40;
    }
  }

  return {
    base,
    extra,
    total: base + extra,
    isWithinCity,
  };
};

const SendParcel = () => {
  const serviceCenters = useLoaderData();
  const [parcelType, setParcelType] = useState("non-document");
  const { user } = useAuth();
  const axiosSecure = useAxiosInstance();
  console.log("user", user);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    resetField,
    formState: { errors },
  } = useForm();

  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");
  const weight = watch("weight");

  const regions = useMemo(
    () => [...new Set(serviceCenters.map((i) => i.region))],
    [serviceCenters],
  );

  const getDistricts = (region) =>
    serviceCenters.filter((i) => i.region === region).map((i) => i.district);

  const getWarehouses = (district) =>
    serviceCenters.find((i) => i.district === district)?.covered_area || [];

  useEffect(() => {
    if (parcelType === "document") resetField("weight");
  }, [parcelType, resetField]);

  useEffect(() => {
    resetField("senderDistrict");
    resetField("senderWarehouse");
  }, [senderRegion, resetField]);

  useEffect(() => {
    resetField("receiverDistrict");
    resetField("receiverWarehouse");
  }, [receiverRegion, resetField]);

  /* ---------- SUBMIT ---------- */
  const onSubmit = (data) => {
    const price = calculatePrice({
      parcelType,
      weight: Number(data.weight || 0),
      senderDistrict: data.senderDistrict,
      receiverDistrict: data.receiverDistrict,
    });

    Swal.fire({
      title: "Confirm Parcel Price",
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>Parcel Type:</b> ${parcelType}</p>
          <p><b>Delivery:</b> ${price.isWithinCity ? "Within City" : "Outside City"}</p>
          <p><b>Base Price:</b> ৳${price.base}</p>
          <p><b>Extra Charge:</b> ৳${price.extra}</p>
          <hr/>
          <p style="font-size:16px"><b>Total: ৳${price.total}</b></p>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Confirm & Proceed",
      cancelButtonText: "Edit",
      confirmButtonColor: "#84cc16",
    }).then((result) => {
      if (result.isConfirmed) {
        const trackingId = generateTrackingId();
        const parcelData = {
          ...data,
          parcelType,
          trackingId,
          totalCost: price.total,
          deliveryStatus: "pending",
          paymentStatus: "unpaid",
          createdAt: new Date().toISOString(),
          created_by: user.email,
        };
        // data post in server
        axiosSecure
          .post("/parcels", parcelData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Parcel Booked Successfully!",
                html: `
          <p><b>Tracking ID:</b> ${parcelData.trackingId}</p>
          <p>Please save this ID to track your parcel.</p>
        `,
                confirmButtonColor: "#84cc16",
              });

              reset();
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Booking Failed",
              text:
                error.response?.data?.message ||
                "Something went wrong. Please try again.",
            });
          });
      }
    });
  };

  const renderError = (name) => (
    <p className="text-red-500 text-xs mt-1 min-h-[12px]">
      {errors[name]?.message || ""}
    </p>
  );

  return (
    <div className="bg-white w-full lg:w-[80vw] mx-auto rounded-xl my-6">
      <h1 className="text-2xl font-bold mb-6">Add Parcel</h1>
      <hr className="mb-4" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Type */}
        <div className="flex gap-6">
          {["document", "non-document"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                checked={parcelType === type}
                onChange={() => setParcelType(type)}
              />
              {type === "document" ? "Document" : "Not-Document"}
            </label>
          ))}
        </div>

        {/* Parcel Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            {...register("parcelName", { required: "Parcel name required" })}
            placeholder="Parcel Name"
            className="input input-bordered w-full"
          />

          {parcelType === "non-document" && (
            <input
              type="number"
              step="0.1"
              {...register("weight", { required: "Weight required" })}
              placeholder="Weight (KG)"
              className="input input-bordered w-full"
            />
          )}
        </div>

        {/* Sender & Receiver */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SENDER */}
          <div className="space-y-3">
            <h3 className="font-semibold">Sender Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <input
                  {...register("senderName", {
                    required: "Sender name required",
                  })}
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                />
                {renderError("senderName")}
              </div>

              <div>
                <select
                  {...register("senderRegion", { required: "Region required" })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {renderError("senderRegion")}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <select
                  {...register("senderDistrict", {
                    required: "District required",
                  })}
                  disabled={!senderRegion}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {getDistricts(senderRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {renderError("senderDistrict")}
              </div>

              <div>
                <select
                  {...register("senderWarehouse", {
                    required: "Warehouse required",
                  })}
                  disabled={!senderDistrict}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Warehouse</option>
                  {getWarehouses(senderDistrict).map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {renderError("senderWarehouse")}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <input
                  {...register("senderContact", {
                    required: "Phone required",
                    pattern: {
                      value: BD_PHONE_REGEX,
                      message: "Invalid BD phone number",
                    },
                  })}
                  placeholder="Contact No"
                  className="input input-bordered w-full"
                />
                {renderError("senderContact")}
              </div>

              <div>
                <input
                  {...register("senderAddress", {
                    required: "Address required",
                  })}
                  placeholder="Address"
                  className="input input-bordered w-full"
                />
                {renderError("senderAddress")}
              </div>
            </div>

            <textarea
              {...register("pickupInstruction")}
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* RECEIVER */}
          <div className="space-y-3">
            <h3 className="font-semibold">Receiver Details</h3>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <input
                  {...register("receiverName", {
                    required: "Receiver name required",
                  })}
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />
                {renderError("receiverName")}
              </div>

              <div>
                <select
                  {...register("receiverRegion", {
                    required: "Region required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                {renderError("receiverRegion")}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <select
                  {...register("receiverDistrict", {
                    required: "District required",
                  })}
                  disabled={!receiverRegion}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {getDistricts(receiverRegion).map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {renderError("receiverDistrict")}
              </div>

              <div>
                <select
                  {...register("receiverWarehouse", {
                    required: "Warehouse required",
                  })}
                  disabled={!receiverDistrict}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Warehouse</option>
                  {getWarehouses(receiverDistrict).map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
                {renderError("receiverWarehouse")}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <input
                  {...register("receiverContact", {
                    required: "Phone required",
                    pattern: {
                      value: BD_PHONE_REGEX,
                      message: "Invalid BD phone number",
                    },
                  })}
                  placeholder="Contact No"
                  className="input input-bordered w-full"
                />
                {renderError("receiverContact")}
              </div>

              <div>
                <input
                  {...register("receiverAddress", {
                    required: "Address required",
                  })}
                  placeholder="Address"
                  className="input input-bordered w-full"
                />
                {renderError("receiverAddress")}
              </div>
            </div>

            <textarea
              {...register("deliveryInstruction")}
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn w-full bg-lime-400 hover:bg-lime-500 text-black font-semibold"
        >
          Send Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
