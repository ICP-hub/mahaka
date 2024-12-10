import React from "react";
import MahakaLogo from "../../assets/images/mahakalogo.svg";
import { HiMiniMapPin, HiMiniPhone, HiMiniPrinter } from "react-icons/hi2";
import {
  FaFacebookSquare,
  FaGooglePlusG,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const address = "345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  return (
    <footer className="bg-[#124076] pt-12 pb-24 text-neutral-100 tracking-wider">
      <div className="flex flex-col container mx-auto space-y-4 px-6 md:px-8">
        <div className="flex flex-col md:flex-row flex-auto">
          <div className="font-black text-4xl">MAHAKA</div>
          <div className="md:ml-auto">
            <div className="flex flex-col mt-4 md:mt-0 space-y-4">
              <div className="flex">
                <HiMiniMapPin size={20} />
                <div className="ml-2">
                  345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
                </div>
              </div>
              <div className="flex w-full flex-col md:flex-row md:items-center">
                <div className="flex">
                  <HiMiniPhone size={20} />
                  <div className="ml-2">(123) 456-7890</div>
                </div>
                <div className="md:ml-auto mt-4 md:mt-0">
                  <div className="flex">
                    <HiMiniPrinter size={20} />
                    <div className="ml-2">(123) 456-7890</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-auto items-center">
                <div className="min-w-fit">Social Media</div>
                <div className="flex justify-between ml-4 w-full">
                  <button>
                    <FaFacebookSquare size={24} />
                  </button>
                  <button>
                    <FaInstagram size={24} />
                  </button>
                  <button>
                    <FaLinkedinIn size={24} />
                  </button>
                  <button>
                    <FaTwitter size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-natural-100">
          <div className="my-4 flex flex-auto flex-col md:flex-row">
            <div className="flex flex-col md:flex-row md:w-1/2 justify-between space-y-4 md:space-y-0">
              <Link to="/about-us">About us</Link>
              <Link to="/contact-us">Contact us</Link>
              <Link to="/our-services">Services</Link>
              <Link to="/privacy-policy">Privacy-policy</Link>
              <Link to="/terms-conditions">Terms</Link>
            </div>
            <div className="md:ml-auto mt-4 md:mt-0">
              © 2024 MAHAKA, LLC. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
    // <footer className="bg-[#124076] px-6 md:px-8 pt-12 text-neutral-100 md:flex-row tracking-wider">
    //   <div className="mx-auto grid w-full  grid-cols-2 gap-12 md:grid-cols-[1fr,_175px,_175px,_175px]">
    //     <div className="flex flex-col items-start gap-4">
    //       <span className="font-black italic text-4xl ml-10">MAHAKA</span>
    //     </div>
    //     <div className="space-y-4">
    //       <span className="  font-bold">Socials</span>
    //       <div className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 cursor-pointer font-medium">
    //         <FaFacebookSquare size={16} />
    //         <span>Facebook</span>
    //       </div>
    //       <div className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 cursor-pointer font-medium">
    //         <FaInstagram size={16} />
    //         <span>Instagram</span>
    //       </div>
    //       <div className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 cursor-pointer font-medium">
    //         <FaLinkedinIn size={16} />
    //         <span>Linkedin</span>
    //       </div>
    //       <div className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 cursor-pointer font-medium">
    //         <FaTwitter size={16} />
    //         <span>Twitter</span>
    //       </div>
    //     </div>
    //     <div className="space-y-4">
    //       <span className="  font-bold">Site</span>
    //       <Link
    //         className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 font-medium cursor-pointer"
    //         to="/"
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 font-medium cursor-pointer"
    //         to="/about-us"
    //       >
    //         About Mahaka
    //       </Link>
    //     </div>
    //     <div className="space-y-4">
    //       <span className=" font-bold">Legal</span>
    //       <div className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 font-medium cursor-pointer">
    //         License
    //       </div>
    //       <Link
    //         className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 font-medium cursor-pointer"
    //         to="/privacy-policy"
    //       >
    //         Privacy Policy
    //       </Link>
    //       <Link
    //         className="flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-indigo-300 font-medium cursor-pointer"
    //         to="/terms-conditions"
    //       >
    //         Terms
    //       </Link>
    //     </div>
    //     <div className="mx-auto flex ml-6  text-md     flex-col-reverse items-center justify-between gap-4  sm:flex-row">
    //       <span>© 2024 MAHAKA, LLC. All rights reserved.</span>
    //     </div>
    //   </div>
    //   <div className="-mx-4 mt-12 border-t-[1px] border-border p-4">
    //     <div className=" ">
    //       <span>© 2024 MAHAKA, LLC. All rights reserved.</span>
    //     </div>
    //   </div>
    // </footer>
  );
}
