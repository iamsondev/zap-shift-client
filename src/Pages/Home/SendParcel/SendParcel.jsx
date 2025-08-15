import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SendParcel = () => {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [services, setServices] = useState([]);
  const [regions, setRegions] = useState([]);

  const senderRegion = watch("sender_region");
  const receiverRegion = watch("receiver_region");
  const parcelType = watch("type");
  const weightValue = watch("weight") || 0;

  useEffect(() => {
    fetch("/service.json")
      .then(res => res.json())
      .then(data => {
        setServices(data);
        const uniqueRegions = [...new Set(data.map(item => item.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  const getCenters = (region) => {
    if (!region) return [];
    return services
      .filter(item => item.region === region)
      .map(item => ({
        name: item.serviceCenter || item.service_center || item.center,
        area: item.covered_area || item.area || ""
      }));
  };

  const calculateCost = (type, serviceCenter, weight) => {
    let baseCost = type === "document" ? 50 : 100;
    if (type === "non-document") {
      baseCost += weight * 10;
    }
    if (serviceCenter) {
      baseCost += 20;
    }
    return baseCost;
  };

  const onSubmit = (data) => {
    const deliveryCost = calculateCost(data.type, data.sender_service_center, parseFloat(data.weight || 0));

    toast((t) => (
      <div className="text-gray-800 dark:text-gray-200">
        <p className="font-semibold text-lg">Estimated Delivery Cost: ৳{deliveryCost}</p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-2 rounded transition"
          onClick={() => {
            const parcelData = { ...data, deliveryCost, creation_date: new Date().toISOString() };
            console.log("Saved Parcel:", parcelData);
            toast.dismiss(t.id);
            toast.success("Parcel booked successfully!");
            reset();
          }}
        >
          Confirm
        </button>
      </div>
    ));
  };

  const cardStyle = "p-6 border rounded-xl shadow-sm dark:shadow-gray-700 dark:border-gray-700 bg-white dark:bg-gray-800 transition";

  const inputStyle = "input input-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  const selectStyle = "select select-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  const textareaStyle = "textarea textarea-bordered w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-800 transition";

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Add Parcel</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Door-to-door delivery — fill in pickup and delivery details</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Parcel Info */}
        <div className={cardStyle}>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Parcel Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1 font-medium">Type</label>
              <select {...register("type", { required: true })} className={selectStyle}>
                <option value="">Select type</option>
                <option value="document">Document</option>
                <option value="non-document">Non-document</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm">Type is required</p>}
            </div>
            <div>
              <label className="block mb-1 font-medium">Title</label>
              <input {...register("title", { required: true })} className={inputStyle} />
              {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
            </div>
            {parcelType === "non-document" && (
              <div>
                <label className="block mb-1 font-medium">Weight (kg)</label>
                <input type="number" step="0.1" {...register("weight")} className={inputStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sender Info */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Sender Info</h2>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input defaultValue="John Doe" {...register("sender_name", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contact</label>
                <input {...register("sender_contact", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Region</label>
                <select {...register("sender_region", { required: true })} className={selectStyle}>
                  <option value="">Select region</option>
                  {regions.map((reg, idx) => (<option key={idx} value={reg}>{reg}</option>))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service Center</label>
                <select {...register("sender_service_center", { required: true })} className={selectStyle}>
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
                <input {...register("sender_address", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Pickup Instruction</label>
                <textarea {...register("pickup_instruction")} className={textareaStyle} />
              </div>
            </div>
          </div>

          {/* Receiver Info */}
          <div className={cardStyle}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Receiver Info</h2>
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input {...register("receiver_name", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Contact</label>
                <input {...register("receiver_contact", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Region</label>
                <select {...register("receiver_region", { required: true })} className={selectStyle}>
                  <option value="">Select region</option>
                  {regions.map((reg, idx) => (<option key={idx} value={reg}>{reg}</option>))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Service Center</label>
                <select {...register("receiver_service_center", { required: true })} className={selectStyle}>
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
                <input {...register("receiver_address", { required: true })} className={inputStyle} />
              </div>
              <div>
                <label className="block mb-1 font-medium">Delivery Instruction</label>
                <textarea {...register("delivery_instruction")} className={textareaStyle} />
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full py-3 text-lg font-semibold hover:bg-blue-600 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
