import React from 'react';
import Marquee from 'react-fast-marquee';

import amazonVector from '../../assets/amazon_vector.png';
import amazonLogo from '../../assets/amazon.png';
import casioLogo from '../../assets/casio.png';
import moonstarLogo from '../../assets/moonstar.png';
import randstadLogo from '../../assets/randstad.png';
import startPeopleLogo from '../../assets/start-people 1.png';
import startLogo from '../../assets/start.png';

const brandLogos = [
  amazonVector,
  amazonLogo,
  casioLogo,
  moonstarLogo,
  randstadLogo,
  startPeopleLogo,
  startLogo,
];

const BrandLogosSection = () => {
  return (
    <section
      className="w-full relative py-10 overflow-hidden"
      style={{
        background:
          `linear-gradient(135deg, #1e293b 0%, #334155 100%), 
           url('https://www.transparenttextures.com/patterns/asfalt-dark.png') repeat`,
        backgroundBlendMode: 'overlay',
        backgroundSize: 'auto, 150px 150px',
      }}
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-white">
        Our Trusted Brands
      </h2>

      <Marquee
        gradient={false}
        speed={50}
        direction="left"
        pauseOnHover={true}
        className="flex items-center"
      >
        {brandLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Brand ${index + 1}`}
            className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition mx-6"
          />
        ))}
      </Marquee>
    </section>
  );
};

export default BrandLogosSection;
