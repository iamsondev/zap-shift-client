import React from 'react';

const ServiceCard = ({ service }) => {
  const { title, description, Icon } = service;

  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-md border border-base-200 bg-base-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 flex flex-col items-start gap-4">

        {/* Icon with theme-aware background */}
        <div className="bg-primary text-white p-4 rounded-full text-3xl shadow-md transition duration-300 group-hover:rotate-6">
          <Icon />
        </div>

        {/* Title with adaptive color */}
        <h3 className="text-xl font-bold text-neutral-content group-hover:text-primary transition">
          {title}
        </h3>

        {/* Description with theme-aware text */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Accent bar (respects current theme's primary color) */}
      <div className="h-1 w-full bg-primary"></div>
    </div>
  );
};

export default ServiceCard;
