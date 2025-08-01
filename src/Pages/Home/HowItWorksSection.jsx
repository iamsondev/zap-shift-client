import React from 'react';
import { motion } from 'framer-motion';

import workflowLogo from '../../assets/bookingIcon.png';

const steps = [
  {
    title: '1. Place Your Order',
    desc: 'Select your favorite products and confirm checkout. It’s fast, safe, and easy.',
  },
  {
    title: '2. Packaging & Dispatch',
    desc: 'We carefully prepare your items with protective packaging for safe delivery.',
  },
  {
    title: '3. Real-Time Tracking',
    desc: 'Stay updated with accurate GPS-based order tracking from dispatch to delivery.',
  },
  {
    title: '4. Receive with Confidence',
    desc: 'Your package arrives quickly and securely—ready to be enjoyed.',
  },
];

// Animation variants for framer-motion
const cardVariants = {
  offscreen: { opacity: 0, y: 50 },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', bounce: 0.2, duration: 0.6 },
  },
};

const HowItWorksSection = () => (
  <section data-aos="fade-up"
     data-aos-duration="3000" className="w-full py-20 px-6 bg-base-100 dark:bg-gray-900 transition-colors duration-500">
    {/* Header */}
    <div className="max-w-6xl mx-auto flex flex-col items-center mb-14">
      <div className="h-16 w-16 rounded-xl bg-white dark:bg-gray-100 shadow-md flex items-center justify-center mb-6">
        <img
          src={workflowLogo}
          alt="Workflow Icon"
          className="h-10 w-10 object-contain"
        />
      </div>
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 text-center">
        How It Works
      </h2>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Our step-by-step process ensures speed, safety, and satisfaction from start to finish.
      </p>
    </div>

    {/* Cards */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center text-center rounded-3xl p-8 bg-white dark:bg-gray-800
                     shadow-lg cursor-pointer"
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className="h-28 w-28 rounded-2xl bg-white dark:bg-gray-100 p-4 shadow-md border border-gray-200 dark:border-gray-700 mb-6 flex items-center justify-center">
            <img
              src={workflowLogo}
              alt={step.title}
              className="object-contain h-full w-full"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {step.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed">
            {step.desc}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
