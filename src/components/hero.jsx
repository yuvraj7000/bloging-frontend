import React, { useState, useEffect, useCallback } from 'react';
import Lottie from 'lottie-react';
import { write_logo, read_logo, share_logo } from './logo';

const slides = [
  {
    logo: read_logo,
    label: 'Read Blogs',
    description: 'Explore diverse content across various categories, from technology to lifestyle, curated for your interests.',
  },
  {
    logo: write_logo,
    label: 'Write Blogs/Stories',
    description: 'Share your thoughts, stories, and expertise with an easy-to-use editor that brings your ideas to life.',
  },
  {
    logo: share_logo,
    label: 'Share Blogs',
    description: 'Expand your blog’s reach by sharing it seamlessly with your audience on social media and other platforms.',
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [nextSlide]);

  return (
    <div className="relative w-full max-w-4xl my-5 mx-auto bg-white overflow-hidden">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <Lottie className="w-full h-96" animationData={slide.logo} />
              <div className="  p-4 text-black">
                <h5 className="text-xl font-bold">{slide.label}</h5>
                <p className="mt-2">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;