import React from 'react';
import Banner from './Banner';
import ServiceSection from './Services/ServiceSection';
import BrandLogosSection from './BrandLogo';
import CoreFeaturesSection from './CoreFeaturesSection';

const Home = () => {
  return (
    <div>
         <Banner></Banner>
         <ServiceSection></ServiceSection>
         <BrandLogosSection></BrandLogosSection>
         <CoreFeaturesSection></CoreFeaturesSection>
    </div>
  );
};

export default Home;