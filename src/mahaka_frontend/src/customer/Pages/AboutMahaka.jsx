import React from "react";
import about from "../../assets/images/about.png";


const About = () => {
  return (
    <>
      <div className=" bg-gray-200 p-3 min-h-screen">
      <h1 class = "font-bold text-2xl md:text-4xl mx-4 my-2 text-left text-gray-600">About <span className = "text-orange-400">Mahaka</span></h1>

       <div className = "grid grid-cols-1 md:grid-cols-2">
        <div className="p-2 text-left my-2 mx-2 flex-grow">
          <h3 className="text-2xl sm:text-3xl text-slate-600 font-bold my-4 border-b-2 border-slate-300 pb-2">
            Why Mahaka?
          </h3>
          <p className="my-2 text-gray-600 text-lg">
            Our project is focused on revolutionizing the way events and services are managed by creating a comprehensive, user-friendly ticketing system.
          </p>
          <p className="my-2 text-gray-600 text-lg">
            The system allows visitors to easily sign up, purchase tickets, and enjoy a hassle-free event experience. Vendors can manage their services, process payments securely, and track their revenue in real-time, while administrators have full control over the platform’s operations, ensuring transparency and smooth management of all activities.
          </p>
          <h3 className="text-2xl sm:text-3xl text-slate-600 font-bold my-4 border-b-2 border-slate-300 pb-2">
            Our Mission
          </h3>
          <p className="my-2 text-gray-600 text-lg">
            Our mission is to simplify event management for all stakeholders, providing a flexible, scalable solution that adapts to a variety of events and services. Whether you're hosting a small gathering or a large-scale event, our ticketing system ensures everything runs smoothly from start to finish.
          </p>
        </div>
        {/* about image */}
        <div className="h-full flex justify-center items-center object-cover">
    <img 
        src={about}
        alt="about img"
        className="w-full rounded-full h-auto max-w-xs md:max-w-sm lg:max-w-md opacity-85"
    />
      </div>


        </div>
      </div>
    </>
  );
};

export default About;
