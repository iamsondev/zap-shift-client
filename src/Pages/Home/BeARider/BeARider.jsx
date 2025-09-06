import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [services, setServices] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const selectedRegion = watch("region");

  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        const uniqueRegions = [...new Set(data.map((item) => item.region))];
        setRegions(uniqueRegions);
      });
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = services
        .filter((item) => item.region === selectedRegion)
        .map((item) => item.district);
      setDistricts(filteredDistricts);
    }
  }, [selectedRegion, services]);

  const onSubmit = (data) => {
    const riderData = {
      ...data,
      email: user?.email,
      name: user?.displayName,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    axiosSecure.post("/riders", riderData)
      .then((res) => {
         console.log("Response from server:", res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Application Submitted",
            text: "Your request to become a rider has been submitted!",
            timer: 2000,
            showConfirmButton: false,
          });
          reset();
        }
      })
      .catch((err) => {
        console.error("Rider submission error:", err);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "Something went wrong. Please try again.",
        });
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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Become a Rider
      </h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Fill out the form below to apply as a delivery rider.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className={cardStyle}>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Rider Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                defaultValue={user?.displayName}
                readOnly
                {...register("name")}
                className={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                defaultValue={user?.email}
                readOnly
                {...register("email")}
                className={inputStyle}
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-1 font-medium">Age</label>
              <input
                type="number"
                {...register("age", { required: true, min: 18 })}
                className={inputStyle}
              />
              {errors.age && (
                <p className="text-red-500 text-sm">Age must be 18+</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                {...register("phone", { required: true })}
                className={inputStyle}
              />
            </div>

            {/* Region */}
            <div>
              <label className="block mb-1 font-medium">Region</label>
              <select
                {...register("region", { required: true })}
                className={selectStyle}
              >
                <option value="">Select Region</option>
                {regions.map((reg, idx) => (
                  <option key={idx} value={reg}>
                    {reg}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block mb-1 font-medium">District</label>
              <select
                {...register("district", { required: true })}
                className={selectStyle}
              >
                <option value="">Select District</option>
                {districts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* NID */}
            <div>
              <label className="block mb-1 font-medium">National ID</label>
              <input
                type="text"
                {...register("nid", { required: true, minLength: 10 })}
                className={inputStyle}
              />
              {errors.nid && (
                <p className="text-red-500 text-sm">
                  Please enter a valid NID number
                </p>
              )}
            </div>

            {/* Bike Brand */}
            <div>
              <label className="block mb-1 font-medium">Bike Brand</label>
              <input
                type="text"
                {...register("bikeBrand", { required: true })}
                className={inputStyle}
                placeholder="Ex: Honda, Yamaha, Bajaj"
              />
            </div>

            {/* Bike Registration Number */}
            <div>
              <label className="block mb-1 font-medium">Bike Registration Number</label>
              <input
                type="text"
                {...register("bikeRegNumber", { required: true })}
                className={inputStyle}
                placeholder="Ex: DHA-12-1234"
              />
            </div>
          </div>

          {/* Extra Info */}
          <div className="mt-4">
            <label className="block mb-1 font-medium">Additional Information</label>
            <textarea
              {...register("extraInfo")}
              className={textareaStyle}
              placeholder="Any additional details about you or your bike..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn bg-lime-400 w-full py-3 text-lg font-semibold hover:bg-lime-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BeARider;
