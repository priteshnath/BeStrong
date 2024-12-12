import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

// Import Slick Carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Dummy image URLs
const dummyImages = [
  '/Photos/Slider_Images/Slider1.jpg',
  '/Photos/Slider_Images/Slider2.jpg',
  '/Photos/Slider_Images/Slider3.jpg',
  '/Photos/Slider_Images/Slider4.jpg',
  '/Photos/Slider_Images/Slider5.jpg',
];

const HeroSection = () => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Enable fade effect for a smoother transition
  };

  const token = localStorage.getItem('token');


  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* React Slick Slider */}
      <Slider {...settings} className="absolute top-0 left-0 w-full h-full">
        {dummyImages.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-cover object-center" />
          </div>
        ))}
      </Slider>

      {/* Dark Overlay - Add this after the Slider */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" /> {/* Adjust opacity as needed */}

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Transform Your Body, Transform Your Life</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Embark on a Journey to Wellness, Elevate Your Fitness Experience,
          Your Ultimate Destination for Unleashing Your Full Potential and Embracing a Vibrant, Active Lifestyle.
        </p>
        <div className="flex justify-center space-x-4">
            <Link
            to={ token ? '/dashboard' : '/login'}
            className="bg-lime-400 px-6 py-3 text-black font-semibold rounded-md">
            Start Now.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
