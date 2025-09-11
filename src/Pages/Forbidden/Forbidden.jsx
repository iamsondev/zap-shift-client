import React from "react";
import { Link } from "react-router";
import { FaExclamationTriangle } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6">
      <div className="text-center max-w-xl">
        <FaExclamationTriangle className="text-8xl mb-6 animate-bounce" />
        <h1 className="text-6xl font-extrabold mb-4">403</h1>
        <h2 className="text-3xl font-semibold mb-4">Access Forbidden</h2>
        <p className="text-lg mb-6">
          Oops! You don’t have permission to access this page. <br />
          Maybe try going back to a safe place?
        </p>
        <Link
          to="/"
          className="inline-block bg-white text-purple-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 hover:text-white transition-all duration-300"
        >
          Go Home
        </Link>
      </div>

      {/* Optional floating background circles for smooth effect */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/10 rounded-full animate-pulse"></div>
    </div>
  );
};

export default Forbidden;
