import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from '../../assets/banner1.png'
import img2 from '../../assets/banner2.png'
import img3 from '../../assets/banner3.png'
const Banner = () => {
  return (
    <Carousel className='max-w-10/12 mx-auto py-3' showThumbs={false} autoPlay={true} infiniteLoop={true}>
      <div>
        <img src={img1}/>
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={img2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={img3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;