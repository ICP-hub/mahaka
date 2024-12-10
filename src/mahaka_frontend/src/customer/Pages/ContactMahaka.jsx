import React from "react";
import { IoMdSend } from "react-icons/io";
import contact from "../../assets/images/contact.png";

const ContactMahaka = () => {
  return (
    <div className="flex min-w-0 flex-auto flex-col">
      <div className="bg-card">
        <div className="container mx-auto flex flex-0 flex-col p-6 dark:bg-transparent sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-8 font-medium">
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap text-indigo-500">Contact Us</div>
            <div className="mt-2">
              <div className="flex items-center text-4xl font-extrabold">
                <span className="text-gray-600">Get in</span>
                <span className="ml-1.5 text-secondary">touch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto p-6 sm:p-10 container mx-auto font-medium">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl gap-6">
          <div>
            <form action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value="41fd433c-a687-4180-94c5-4b86a96feae1"
              />

              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 px-4 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-indigo-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus:border-indigo-500"
                  style={{ resize: "none" }}
                ></textarea>
              </div>

              <input
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              <div className="flex flex-end justify-end items-center">
                <button
                  type="submit"
                  className="w-full items-center flex space-x-2 px-4 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors md:max-w-max justify-center"
                >
                  <span>Send Message</span>
                  <IoMdSend size={24} />
                </button>
              </div>
            </form>
          </div>
          <div className="order-first md:order-last">
            <div className="h-full flex justify-center items-center">
              <img
                src={contact}
                alt="contact img"
                className="w-full h-auto max-w-xs md:max-w-sm lg:max-w-md opacity-85"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMahaka;
