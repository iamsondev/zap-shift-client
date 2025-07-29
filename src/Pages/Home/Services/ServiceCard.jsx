import React from 'react';

const ServiceCard = ({ service }) => {
  const { title, description, Icon } = service;

  return (
    <div className="group relative flex flex-col justify-between h-80 rounded-2xl shadow-md border border-base-200 bg-base-100 hover:bg-primary/10 dark:hover:bg-primary/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 flex flex-col items-center gap-4 text-center flex-grow">

        {/* Icon centered */}
        <div className="bg-primary text-white p-4 rounded-full text-3xl shadow-md transition duration-300 group-hover:rotate-6 flex items-center justify-center">
          <Icon />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-neutral-content group-hover:text-primary transition">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom Accent Bar */}
      <div className="h-1 w-full bg-primary"></div>
    </div>
  );
};

export default ServiceCard;
