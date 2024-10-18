import React from 'react';
import { IoMdSend } from "react-icons/io";
import contact from "../../assets/images/contact.png";

const ContactMahaka = () => {
    return (
        <div className=" bg-gray-200 p-3 min-h-screen ">
            <h1 class = "font-bold text-2xl md:text-4xl mx-4 my-2 text-left text-gray-600">Get in <span className = "text-orange-400">Touch</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               

                {/* Contact Form */}
                <div className="p-6 rounded-lg">
                    <h2 className="text-lg font-bold text-gray-500 mb-4">Contact Us</h2>
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Your Name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write your message..."
                                required
                            ></textarea>
                        </div>

                        <div className = " flex justify-end">
                          
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 flex rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Send Message
                                <IoMdSend className = "mx-2 my-1"/>
                            </button>
                        </div>
                    </form>
                </div>

                {/* contact image */}
                <div className="h-full flex justify-center items-center">
    <img 
        src={contact}
        alt="contact img"
        className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md opacity-85"
    />
</div>

            </div>
        </div>
    );
};

export default ContactMahaka;
