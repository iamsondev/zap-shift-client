import React from "react";

const JoinUsSection = () => {
  return (
    <section
      className="w-full bg-[url('assets/B-merch.png')] bg-cover bg-center bg-no-repeat py-24 px-6 text-center text-white relative bg-emerald-900"
      
       
    >
      

      <div className="relative z-10 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Partner With Profas Courier
        </h2>
        <p className="text-lg md:text-xl mb-10 font-medium">
          Join our network to grow your business or earn extra income by delivering with Profas Courier. Be part of a trusted logistics ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 font-semibold">
            Become Merchant
          </button>
          <button className="px-6 py-3 rounded-lg text-indigo-600 bg-white hover:bg-gray-100 transition duration-300 font-semibold">
            Earn with Profas Courier
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
