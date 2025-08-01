import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  { name: "Alice Johnson", feedback: "Fantastic service! My order arrived early and in perfect condition. Highly recommend." },
  { name: "Michael Lee", feedback: "Customer support was very responsive and helpful. I felt valued throughout the process." },
  { name: "Sophia Martinez", feedback: "The tracking feature kept me updated every step of the way. Made me feel secure about my purchase." },
  { name: "David Kim", feedback: "Packaging was excellent — everything arrived without a scratch. Great attention to detail!" },
  { name: "Emma Brown", feedback: "Ordering was super easy and fast. I appreciate the smooth user experience on the website." },
  { name: "James Wilson", feedback: "Delivery was quick and the products exceeded my expectations. Will order again!" },
  { name: "Olivia Davis", feedback: "Friendly support team and transparent communication throughout the process. Very professional." },
  { name: "Liam Garcia", feedback: "Reliable service with fair pricing. My go-to for online orders from now on." },
  { name: "Isabella Rodriguez", feedback: "I love how safe and secure the delivery is. It gives peace of mind every time." },
  { name: "Noah Thompson", feedback: "Overall excellent experience. I especially like the live tracking option—it’s very convenient." },
];

// Subtle professional gradients with muted colors
const gradients = [
  "from-gray-700 to-gray-900",
  "from-blue-800 to-blue-900",
  "from-indigo-700 to-indigo-900",
  "from-green-700 to-green-900",
  "from-purple-700 to-purple-900",
  "from-teal-700 to-teal-900",
  "from-cyan-700 to-cyan-900",
  "from-slate-700 to-slate-900",
  "from-emerald-700 to-emerald-900",
  "from-rose-700 to-rose-900",
];

const CustomerReviewSlider = () => (
  <section data-aos="fade-up"
     data-aos-duration="3000" className="w-full py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-700" >
    <div className="max-w-5xl mx-auto text-center mb-14 px-4">
      <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
        What Our Customers Say
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
        Hear from some of our satisfied customers who trust us for their deliveries.
      </p>
    </div>

    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={24}
      slidesPerView={3}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3500, disableOnInteraction: false }}
      loop={true}
      className="max-w-6xl mx-auto"
      breakpoints={{
        320: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
    >
      {reviews.map(({ name, feedback }, index) => (
        <SwiperSlide key={index}>
          <div
            className={`
              flex flex-col justify-between h-full w-full rounded-xl p-8
              bg-gradient-to-br ${gradients[index % gradients.length]}
              shadow-lg text-white
              transition-transform duration-300 hover:scale-[1.03] cursor-default
            `}
            style={{ minHeight: "280px" }}
          >
            <blockquote className="text-base italic leading-relaxed relative mb-6">
              <span className="absolute text-4xl -top-4 -left-3 opacity-10 select-none">“</span>
              {feedback}
              <span className="absolute text-4xl -bottom-4 -right-3 opacity-10 select-none">”</span>
            </blockquote>
            <p className="text-md font-semibold tracking-wide drop-shadow-sm">
              — {name}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default CustomerReviewSlider;
