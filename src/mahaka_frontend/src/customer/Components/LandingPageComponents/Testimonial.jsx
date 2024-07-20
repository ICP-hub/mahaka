import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Frame from "../../../assets/images/Frame.png"
const testimonials = [
  {
    text: "Your app brings so much peace and tolerance to our home.",
    author: "Rachael, UK",
    description: "on meditation's positive effect on family life",
  },
  {
    text: "I came to learn that the storyline in my head ... was holding me back.",
    author: "Peter, Belgium",
    description: "on what he learned when sitting with himself",
  },
  {
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    author: "Kari, UK",
    description: "on finding her happy place",
  },
  {
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    author: "Kari, UK",
    description: "on finding her happy place",
  },
  {
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    author: "Kari, UK",
    description: "on finding her happy place",
  },
  {
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    author: "Kari, UK",
    description: "on finding her happy place",
  },
  {
    text: "Headspace provides me with ... a connection to myself, and a disconnection from negative thoughts, feelings, and sensations.",
    author: "Kari, UK",
    description: "on finding her happy place",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handlePrev = () => {
    if (!animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
        setAnimating(false);
      }, 600); // Adjust this duration to match the CSS transition duration
    }
  };

  const handleNext = () => {
    if (!animating) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
        setAnimating(false);
      }, 600); // Adjust this duration to match the CSS transition duration
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const getVisibleTestimonials = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    const nextIndex = (currentIndex + 1) % testimonials.length;
    return [
      testimonials[prevIndex],
      testimonials[currentIndex],
      testimonials[nextIndex]
    ];
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (

      <div className="mx-auto flex flex-col justify-center justify-items-center items-center w-full max-w-7xl p-4" {...handlers}>
        <h1 className='text-7xl font-black text-center pb-15'>Testimonials</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-7 ">
          <div className="hidden md:flex flex-none w-[336.6px] h-[400px] px-2 opacity-40">
            <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
              <img src={Frame} alt="" className='w-[67.5px] h-[46.59px] '/>
              <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
                {visibleTestimonials[0].text}
              </p>
              <div className='mt-auto'>
                <p className="mb-2 text-sm font-medium">
                  {visibleTestimonials[0].author}
                </p>
                <p className="text-sm text-gray-500">
                  {visibleTestimonials[0].description}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-none w-full sm:w-1/2 md:w-[336.6px] h-[400px] px-2">
            <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
            <img src={Frame} alt="" className='w-[67.5px] h-[46.59px]'/>
              <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
                {visibleTestimonials[1].text}
              </p>
              <div className='mt-auto'>
                <p className="mb-2 text-sm font-medium">
                  {visibleTestimonials[1].author}
                </p>
                <p className="text-sm text-gray-500">
                  {visibleTestimonials[1].description}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex flex-none w-[336.6px] h-[400px] px-2 opacity-40">
            <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
            <img src={Frame} alt="" className='w-[67.5px] h-[46.59px]'/>
              <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
                {visibleTestimonials[2].text}
              </p>
              <div className='mt-auto'>
                <p className="mb-2 text-sm font-medium">
                  {visibleTestimonials[2].author}
                </p>
                <p className="text-sm text-gray-500">
                  {visibleTestimonials[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {testimonials.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? 'bg-orange-500'
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
        <div className="flex justify-center items-center mt-8 gap-5">
          <button
            className="p-2 h-9 w-9 text-white bg-orange-500 rounded-full focus:outline-none"
            onClick={handlePrev}
          >
            &#x3c;
          </button>
          <button
            className="p-2 h-9 w-9 text-white bg-orange-500 rounded-full focus:outline-none"
            onClick={handleNext}
          >
            &#x3e;
          </button>
        </div>
      </div>

  );
};

export default TestimonialCarousel;
