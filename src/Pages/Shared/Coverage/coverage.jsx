import React from 'react';
import BangladeshMap from './BangladeshMap';
import { useLoaderData } from 'react-router';

const coverage = () => {
  const serviceCenters = useLoaderData();
  return (
      <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">We are available in 64 districts</h1>
      <BangladeshMap serviceCenters={serviceCenters}/>
      {/* Search box will go here later */}
    </div>
  );
};

export default coverage;