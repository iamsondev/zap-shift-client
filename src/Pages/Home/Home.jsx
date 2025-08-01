import React from 'react';
import Banner from './Banner';
import ServiceSection from './Services/ServiceSection';
import BrandLogosSection from './BrandLogo';
import CoreFeaturesSection from './CoreFeaturesSection';
import HowItWorksSection from './HowItWorksSection';
import CustomerReviewSlider from './CustomerReviewSlider';
import JoinUsSection from './JoinUsSection';
import ProfasAccordionSection from './ProfasAccordionSection';

const Home = () => {
  return (
    <div>
         <Banner></Banner>
         <HowItWorksSection></HowItWorksSection>
         <ServiceSection></ServiceSection>
         <BrandLogosSection></BrandLogosSection>
         <CoreFeaturesSection></CoreFeaturesSection>
         <CustomerReviewSlider></CustomerReviewSlider>
         <JoinUsSection></JoinUsSection>
         <ProfasAccordionSection></ProfasAccordionSection>
         
    </div>
  );
};

export default Home;