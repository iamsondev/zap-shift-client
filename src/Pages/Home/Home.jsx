import React from 'react';
import Banner from './Banner';
import ServiceSection from './Services/ServiceSection';
import BrandLogosSection from './BrandLogo';

const Home = () => {
  return (
    <div>
         <Banner></Banner>
         <ServiceSection></ServiceSection>
         <BrandLogosSection></BrandLogosSection>
    </div>
  );
};

export default Home;