import React from "react";
import { MdAppRegistration } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiCustomize } from "react-icons/bi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { RiRefund2Line } from "react-icons/ri";
import { TbTableOptions } from "react-icons/tb";
import { MdFreeCancellation } from "react-icons/md";

const ServicesMahaka = ()=>{
    return (
        
     <div class="p-3 bg-gray-200 min-h-screen ">
        <h1 class = "font-bold text-2xl md:text-4xl mx-4 my-2 text-left text-gray-600">Tailored <span className = "text-orange-400">Services</span> for Every Need</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3 mx-3 p-2">
          <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  < MdFreeCancellation className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Easy Booking & Cancellation</h3>
            <p className="text-gray-600">
            Book and cancel with ease using our user-friendly interface. Manage your reservations in one place.
            </p>
            </div>
            
            
                </div>
          

                <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  <MdAppRegistration  className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Visitor Registration & Ticketing</h3>
            <p className="text-gray-600">
            Effortless sign-up and ticket purchasing options for visitors, ensuring a smooth and quick process for event entry..
            </p>
            </div>
            
            
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  <RiSecurePaymentFill className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Secure Payments</h3>
            <p className="text-gray-600">
            Our platform supports multiple payment gateways for a smooth and secure checkout process.
            </p>
            </div>
            
            
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  < TbTableOptions  className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Customizable Ticket Options</h3>
            <p className="text-gray-600">
            Offering flexible ticket types, including VIP passes, early-bird discounts, and group bookings to cater to diverse event needs..
            </p>
            </div>
            
            
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  < IoNotificationsCircleOutline className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Event Scheduling & Notifications</h3>
            <p className="text-gray-600">
            Receive timely notifications and reminders for your upcoming bookings and events.
            </p>
            </div>
            
            
                </div>

                <div className="p-6 bg-white rounded-lg shadow-lg transition-transform duration-100 transform hover:scale-105">
          <div className = "flex flex-col">
          <div class="my-2">
                  < RiRefund2Line className="text-7xl text-blue-400" />
                </div>
            
              
            <h3 className="text-lg font-bold text-gray-700 mb-4">Refund & Cancellation Support</h3>
            <p className="text-gray-600">
            Easy refund and cancellation options for visitors, with clear policies to ensure a hassle-free experience..
            </p>
            </div>
            
            
                </div>
        </div>
        </div>
        
    )
}

export default ServicesMahaka;