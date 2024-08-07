import React from 'react'
import "../style/index.css"

export default function HeroCard() {
  return (
  <>
  <div className='max-w-7xl w-full m-auto my-18  px-4 lg:px-1'>
    
    <div className=' max-w-7xl m-auto  text-white rounded-2xl crowsel'>
    <div className='max-w-screen-sm rounded-2xl  md:py-10 md:px-4 sm:px-6 lg:px-8 inside-crousel'  >
    <div className="max-w-lg pl-11 ">
            <h2 className="lg:text-4xl font-[950] text-white text-3xl">
              Mahaka Attraction Special
            </h2>
            <p className="mt-4 lg:text-7xl text-4xl font-[950]  leading-6 text-[#C9D7FF]">
              Join Now
            </p>
            <p className="mt-2 max-w-2xl font-normal text-lg text-white">
              Lorem ipsum dolor sit amet consectetur. Morbi morbi fermentum
              ridiculus nunc praesent erat pretium. Porttitor turpis sit
              porttitor enim viverra ut.
            </p>
            <div className="my-6 ">
              <a
                href="#"
                className="inline-flex items-center px-14 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#F08E1E] hover:bg-orange-600"
              >
                Join Now
              </a>
            </div>
          </div>
          </div>
    </div>
  </div>

  </>
  )
}
