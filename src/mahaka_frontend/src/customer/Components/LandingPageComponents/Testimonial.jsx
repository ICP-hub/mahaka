import React, { useEffect, useState } from "react";
// import { useSwipeable } from 'react-swipeable';
import Frame from "../../../assets/images/Frame.png";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";

const testimonials = [
  {
    text: "This app has been a game changer for my daily routine. I feel more focused and relaxed.",
    author: "Sarah, USA",
    description: "on the positive impact on her daily productivity",
  },
  {
    text: "I’ve never experienced such a deep sense of calm before. Truly transformative!",
    author: "Liam, Canada",
    description: "on achieving a new level of calm",
  },
  {
    text: "The guided sessions are incredibly helpful. I’ve learned so much about mindfulness.",
    author: "Amina, Australia",
    description: "on the educational aspect of the app",
  },
  {
    text: "My stress levels have drastically decreased since using this app. Highly recommend!",
    author: "Raj, India",
    description: "on reducing stress and anxiety",
  },
  {
    text: "I love how easy it is to integrate mindfulness into my busy schedule. It’s a lifesaver!",
    author: "Emily, UK",
    description: "on integrating mindfulness into a busy lifestyle",
  },
  {
    text: "The app’s calming voice and soothing music make each session a pleasure. Five stars!",
    author: "Carlos, Spain",
    description: "on the app's audio features",
  },
  {
    text: "I didn’t realize how much I needed this until I started using it. It’s a must-have!",
    author: "Lena, Germany",
    description: "on discovering the app’s value",
  },
  {
    text: "The app has helped me manage my anxiety and improve my overall well-being. Fantastic!",
    author: "Sophie, France",
    description: "on managing anxiety and improving well-being",
  },
  {
    text: "I appreciate the variety of meditation techniques offered. There’s something for everyone.",
    author: "Jake, Netherlands",
    description: "on the variety of meditation techniques",
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimationControls();

  const [itemsToShow, setItemsToShow] = useState(
    getItemsToShow(window.innerWidth)
  );
  const [isSmallOrMediumScreen, setIsSmallOrMediumScreen] = useState(
    window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setItemsToShow(getItemsToShow(width));
      setIsSmallOrMediumScreen(width < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePrev = async () => {
    const newIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    await controls.start({ rotate: -20, transition: { duration: 1 } });
    await controls.start({ rotate: 0, transition: { duration: 0.5 } });
  };

  const handleNext = async () => {
    // Start the rotation and sliding animations together
    const newIndex =
      (currentIndex + 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(newIndex);
    await controls.start({ rotate: 20, transition: { duration: 1 } });
    await controls.start({ rotate: 0, transition: { duration: 0.5 } });
  };

  const handleDotClick = async (index) => {
    setCurrentIndex(index * itemsToShow);
    await controls.start({ rotate: 20, transition: { duration: 1 } });
    await controls.start({ rotate: 0, transition: { duration: 0.5 } });
  };

  const getOpacity = (index) => {
    if (itemsToShow === 3) {
      const middleIndex = Math.floor(itemsToShow / 2);
      const offset = index - currentIndex;
      return Math.abs(offset) === middleIndex ? "opacity-100" : "opacity-50";
    }
    return "opacity-100";
  };

  return (
    <div className="relative mx-auto flex flex-col items-center w-full max-w-7xl p-4 overflow-hidden">
      <h1 className="text-7xl font-black text-center pb-15">Testimonials</h1>
      <div className="relative w-full">
        <motion.div
          className="flex"
          animate={{ x: `-${(currentIndex / itemsToShow) * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut", stiffness: 300 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ rotate: 0 }}
              animate={controls}
              className={`flex-none ${getCardWidth()} px-4 ${getOpacity(
                index
              )}`}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="flex flex-col items-center justify-center mt-12">
        <div className="flex mx-4">
          {Array.from({
            length: Math.ceil(testimonials.length / itemsToShow),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === Math.floor(currentIndex / itemsToShow)
                  ? "bg-orange-500"
                  : "bg-gray-400"
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
    </div>
  );

  function getCardWidth() {
    return "w-full sm:w-full md:w-1/2 lg:w-1/3";
  }
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="flex flex-col min-w-[300px] p-8 shadow-lg rounded-lg bg-[#F9F9F9]">
      <img src={Frame} alt="frame" className="h-12 w-16 mb-4" />
      <p className="mb-4 text-2xl font-medium text-gray-700 text-justify">
        {testimonial.text}
      </p>
      <p className="text-lg font-light text-gray-600 mt-12">
        {testimonial.author}
      </p>
      <p className="text-sm text-gray-600">{testimonial.description}</p>
    </div>
  );
};

// Helper function to determine the number of items to show based on screen width
function getItemsToShow(width) {
  if (width >= 1024) return 3; // Large screens
  if (width >= 768) return 2; // Medium screens
  return 1; // Small screens
}

export default TestimonialCarousel;

// const TestimonialCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [animating, setAnimating] = useState(false);

//   const handlePrev = () => {
//     if (!animating) {
//       setAnimating(true);
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
//         setAnimating(false);
//       }, 600); // Adjust this duration to match the CSS transition duration
//     }
//   };

//   const handleNext = () => {
//     if (!animating) {
//       setAnimating(true);
//       setTimeout(() => {
//         setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
//         setAnimating(false);
//       }, 600); // Adjust this duration to match the CSS transition duration
//     }
//   };

//   const handlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const getVisibleTestimonials = () => {
//     const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
//     const nextIndex = (currentIndex + 1) % testimonials.length;
//     return [
//       testimonials[prevIndex],
//       testimonials[currentIndex],
//       testimonials[nextIndex]
//     ];
//   };

//   const visibleTestimonials = getVisibleTestimonials();

//   return (

//       <div className="mx-auto flex flex-col justify-center justify-items-center items-center w-full max-w-7xl p-4" {...handlers}>
//         <h1 className='text-7xl font-black text-center pb-15'>Testimonials</h1>
//         <div className="grid lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-7 ">
//           <div className="hidden md:flex flex-none w-[336.6px] h-[400px] px-2 opacity-40">
//             <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
//               <img src={Frame} alt="" className='w-[67.5px] h-[46.59px] '/>
//               <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
//                 {visibleTestimonials[0].text}
//               </p>
//               <div className='mt-auto'>
//                 <p className="mb-2 text-sm font-medium">
//                   {visibleTestimonials[0].author}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {visibleTestimonials[0].description}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="flex-none w-full sm:w-1/2 md:w-[336.6px] h-[400px] px-2">
//             <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
//             <img src={Frame} alt="" className='w-[67.5px] h-[46.59px]'/>
//               <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
//                 {visibleTestimonials[1].text}
//               </p>
//               <div className='mt-auto'>
//                 <p className="mb-2 text-sm font-medium">
//                   {visibleTestimonials[1].author}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {visibleTestimonials[1].description}
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="hidden lg:flex flex-none w-[336.6px] h-[400px] px-2 opacity-40">
//             <div className={`flex flex-col  p-8 bg-[#F9F9F9] shadow-lg rounded-lg h-full transform ${animating ? 'rotate-15' : 'rotate-0'} transition-transform duration-600 ease-in-out`}>
//             <img src={Frame} alt="" className='w-[67.5px] h-[46.59px]'/>
//               <p className="mb-4 text-3xl font-medium text-gray-700  text-justify">
//                 {visibleTestimonials[2].text}
//               </p>
//               <div className='mt-auto'>
//                 <p className="mb-2 text-sm font-medium">
//                   {visibleTestimonials[2].author}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {visibleTestimonials[2].description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center mt-4 space-x-4">
//           {testimonials.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full ${
//                 index === currentIndex
//                   ? 'bg-orange-500'
//                   : 'bg-gray-400'
//               }`}
//             />
//           ))}
//         </div>
//         <div className="flex justify-center items-center mt-8 gap-5">
//           <button
//             className="p-2 h-9 w-9 text-white bg-orange-500 rounded-full focus:outline-none"
//             onClick={handlePrev}
//           >
//             &#x3c;
//           </button>
//           <button
//             className="p-2 h-9 w-9 text-white bg-orange-500 rounded-full focus:outline-none"
//             onClick={handleNext}
//           >
//             &#x3e;
//           </button>
//         </div>
//       </div>

//   );
// };

// export default TestimonialCarousel;
