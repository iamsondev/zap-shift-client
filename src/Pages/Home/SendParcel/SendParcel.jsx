import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

function generateTrackingId() {
  const prefix = "PK";
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // YYYYMMDD
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase(); // 5 chars
  return `${prefix}-${date}-${randomPart}`;
}
const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [regions, setRegions] = useState([]);
  const { logTracking } = useTrackingLogger();

  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");
  const parcelType = watch("type");

  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        const uniqueRegions = [...new Set(data.map((item) => item.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  const getCenters = (region) => {
    if (!region) return [];
    return services
      .filter((item) => item.region === region)
      .map((item) => ({
        name: item.serviceCenter || item.service_center || item.center,
        area: item.covered_area || item.area || "",
      }));
  };

  // 🛒 Pricing Policy Function
  const calculateCost = (type, senderRegion, receiverRegion, weight) => {
    const isWithinCity = senderRegion === receiverRegion;
    let base = 0;
    let extra = 0;
    let total = 0;

    if (type === "document") {
      base = isWithinCity ? 60 : 80;
      total = base;
    } else if (type === "non-document") {
      if (weight <= 3) {
        base = isWithinCity ? 110 : 150;
        total = base;
      } else {
        const extraWeight = weight - 3;
        extra = extraWeight * 40;
        if (isWithinCity) {
          base = 110;
          total = base + extra;
        } else {
          base = 150;
          total = base + extra + 40; // outside city extra
          extra += 40;
        }
      }
    }

    return { base, extra, total };
  };

  const onSubmit = (data) => {
    const { base, extra, total } = calculateCost(
      data.type,
      data.sender_region,
      data.receiver_region,
      parseFloat(data.weight || 0)
    );

    Swal.fire({
      title: `<strong>📦 Parcel Price Breakdown</strong>`,
      html: `
      <div style="text-align:left; font-size:16px; line-height:1.6;">
        <p><strong>Sender Name:</strong> ${data.sender_name}</p>
        <p><strong>Receiver Name:</strong> ${data.receiver_name}</p>
        <p><strong>Parcel Type:</strong> ${data.type}</p>
        <p><strong>Base Cost:</strong> ৳${base}</p>
        <p><strong>Extra Cost:</strong> ৳${extra}</p>
        <p><strong>Total Cost:</strong> <span style="color:#28a745; font-size:18px;">৳${total}</span></p>
      </div>
    `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "✅ Confirm Booking",
      cancelButtonText: "❌ Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newTrackingId = generateTrackingId();

        const parcelData = {
          ...data,
          deliveryCost: total,
          Payment_status: "unpaid",
          delivery_status: "not_collected",
          created_by_email: user?.email || "",
          tracking_id: newTrackingId,
          creation_date: new Date().toISOString(),
        };

        try {
          const res = await axiosSecure.post("/parcels", parcelData);

          if (res.data.id) {
            // ✅ Log tracking immediately after parcel creation
            await logTracking({
              tracking_id: newTrackingId,
              status: "Parcel Submitted",
              location: data.sender_region,
              details: `Parcel submitted by ${user?.email || "Unknown User"}`,
              updated_by: user?.email || "system",
            });

            Swal.fire({
              icon: "success",
              title: "Redirecting",
              text: "Proceeding to payment gateway!",
              timer: 2000,
              showConfirmButton: false,
              timerProgressBar: true,
            });

            reset(); // ✅ clear form after submission
          }
        } catch (err) {
          console.error("❌ Error creating parcel:", err);
          Swal.fire("Error", "Failed to create parcel. Try again!", "error");
        }
      }
    });
  };


  const cardStyle =
    "p-6 border rounded-xl shadow-sm dark:shadow-gray-700 dark:border-gray-700 bg-white dark:bg-gray-800 transition";

  const inputStyle =
    "input input-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  const selectStyle =
    "select select-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  const textareaStyle =
    "textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Add Parcel
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Door-to-door delivery — fill in pickup and delivery details
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className={cardStyle}>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Parcel Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select
                {...register("type", { required: true })}
                className={selectStyle}
              >
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-document</option>
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm">Type is required</p>
              )}
            </div>
            <div>
              <label className="block mb-1 font-medium">Parcel name</label>
              <input
                {...register("title", { required: true })}
                className={inputStyle}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 font-medium">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", { required: true, min: 0.1 })}
                  className={inputStyle}
                />
                {errors.weight && (
                  <p className="text-red-500 text-sm">
                    Weight must be greater than 0
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Sender Info
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  defaultValue="John Doe"
                  {...register("sender_name", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contact</label>
                <input
                  {...register("sender_contact", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Region</label>
                <select
                  {...register("sender_region", { required: true })}
                  className={selectStyle}
                >
                  <option value="">Select region</option>
                  {regions.map((reg, idx) => (
                    <option key={idx} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service Center</label>
                <select
                  {...register("sender_service_center", { required: true })}
                  className={selectStyle}
                >
                  <option value="">Select service center</option>
                  {getCenters(senderRegion).map((center, idx) => (
                    <option key={idx} value={center.name}>
                      {center.name} {center.area ? `(${center.area})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  {...register("sender_address", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Pickup Instruction
                </label>
                <textarea
                  {...register("pickup_instruction")}
                  className={textareaStyle}
                />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Receiver Info
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  {...register("receiver_name", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contact</label>
                <input
                  {...register("receiver_contact", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Region</label>
                <select
                  {...register("receiver_region", { required: true })}
                  className={selectStyle}
                >
                  <option value="">Select region</option>
                  {regions.map((reg, idx) => (
                    <option key={idx} value={reg}>
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service Center</label>
                <select
                  {...register("receiver_service_center", { required: true })}
                  className={selectStyle}
                >
                  <option value="">Select service center</option>
                  {getCenters(receiverRegion).map((center, idx) => (
                    <option key={idx} value={center.name}>
                      {center.name} {center.area ? `(${center.area})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <input
                  {...register("receiver_address", { required: true })}
                  className={inputStyle}
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">
                  Delivery Instruction
                </label>
                <textarea
                  {...register("delivery_instruction")}
                  className={textareaStyle}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-semibold hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
