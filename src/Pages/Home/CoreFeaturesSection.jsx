import React from 'react';

// Import images
import fastDeliveryImg from '../../assets/big-deliveryman.png';
import liveTrackingImg from '../../assets/live-tracking.png';
import safeDeliveryImg from '../../assets/safe-delivery.png';

const features = [
  {
    img: fastDeliveryImg,
    title: 'Fast Delivery',
    tagline: 'Speed that surprises you',
    description:
      'We pride ourselves on getting your orders delivered in record time. Our extensive logistics network and optimized route planning ensure that your items reach you swiftly and efficiently, no matter where you are. We understand the importance of punctuality, which is why our delivery partners are committed to maintaining high-speed and reliable service standards every step of the way.',
    bg: 'bg-blue-100 dark:bg-blue-900',
    hoverBg: 'hover:bg-blue-200 dark:hover:bg-blue-800',
  },
  {
    img: liveTrackingImg,
    title: '24×7 Live Support',
    tagline: 'Always at your service',
    description:
      'Our dedicated customer support team is available around the clock to assist you with any inquiries or concerns. Whether you need real-time updates on your shipment, help with order modifications, or answers to your questions, our knowledgeable representatives are ready to provide personalized support. We believe in transparency and communication to make your experience seamless and worry-free.',
    bg: 'bg-yellow-100 dark:bg-yellow-900',
    hoverBg: 'hover:bg-yellow-200 dark:hover:bg-yellow-800',
  },
  {
    img: safeDeliveryImg,
    title: 'Safe & Secure',
    tagline: 'Handled with care',
    description:
      'Every product is packaged with the utmost care and attention to detail. From fragile glassware to high-value electronics, we utilize state-of-the-art packaging materials and handling techniques to guarantee your items arrive in perfect condition. Our safety protocols and quality checks minimize risks and provide peace of mind that your purchases are protected throughout transit.',
    bg: 'bg-green-100 dark:bg-green-900',
    hoverBg: 'hover:bg-green-200 dark:hover:bg-green-800',
  },
];

const CoreFeaturesSection = () => {
  return (
    <section data-aos="fade-up"
     data-aos-duration="3000" className="w-full py-20 px-6 bg-base-100 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We deliver more than just packages — we deliver trust. Here's what makes us stand out:
        </p>
      </div>

      <div className="flex flex-col items-center gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`w-full max-w-7xl p-8 rounded-3xl shadow-md transition duration-300 cursor-pointer ${feature.bg} ${feature.hoverBg}`}
          >
            <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-8">
              <div className="min-w-[150px] w-36 h-36 rounded-full bg-white dark:bg-gray-300 shadow-inner flex items-center justify-center">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="h-24 w-24 object-contain"
                />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{feature.title}</h3>
                <p className="text-base text-indigo-600 dark:text-indigo-400 font-medium mb-3">{feature.tagline}</p>
                <p className="text-gray-700 dark:text-gray-300 text-[16px] leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreFeaturesSection;
