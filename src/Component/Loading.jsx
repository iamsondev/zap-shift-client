import React from "react";
import { FaBox } from "react-icons/fa";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-4">
        <div className="text-primary text-6xl animate-spin-slow">
          <FaBox />
        </div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{message}</p>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
