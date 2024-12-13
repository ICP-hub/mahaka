import React from "react";
import "../style/index.css";
import { Link } from "react-router-dom";

export default function HeroCard({ bannerData, bannerLoading }) {
  console.log(bannerData);
  console.log("banner loading in home.jsx", bannerLoading);

  // Extract the image URL from bannerData
  const backgroundImage = bannerData?.image || ""; // Replace `imageUrl` with the correct key from your bannerData

  return (
    <div className="max-w-7xl w-full m-auto my-18 px-6 md:px-8 container mx-auto">
      <div
        className="max-w-7xl m-auto text-white rounded-2xl  "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-screen-sm rounded-2xl md:py-10 md:px-4 sm:px-6 flex flex-col justify-between lg:px-8 inside-crousel">
          <div className="max-w-lg pl-11">
            <h2 className="lg:text-4xl font-[950] mt-4 sm:mt-0 text-white  sm:text-3xl">
              {bannerData?.title}
            </h2>

            <p className="mt-2 max-w-2xl font-normal sm:text-lg text-white line-clamp-2">
              {bannerData?.description}
            </p>
            <div className="my-6">
              <a
                href={
                  bannerData?.redirectUrl?.startsWith("http")
                    ? bannerData.redirectUrl
                    : `https://${bannerData?.redirectUrl}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center sm:px-14 sm:py-3 p-2 border border-transparent  text-base font-medium rounded-md shadow-sm text-white bg-[#F08E1E] hover:bg-orange-600"
              >
                join now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
