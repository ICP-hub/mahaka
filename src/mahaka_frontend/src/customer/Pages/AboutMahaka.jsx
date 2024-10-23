import React from "react";
import mahakalogo from "../../assets/images/mahakalogo.png";
import mahakalogo2 from "../../assets/images/mahakalogo2.png";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo2.png";
import logo3 from "../../assets/images/logo3.png";
import logo4 from "../../assets/images/logo4.png";
import logo5 from "../../assets/images/logo5.png";
import logo6 from "../../assets/images/logo6.png";
import logo7 from "../../assets/images/logo7.png";
import logobd from "../../assets/images/logobd.png";
import logosub from "../../assets/images/logosub.png";
import memlogo from "../../assets/images/memlogo.png";
import memlogo1 from "../../assets/images/memlogo1.png";
import memlogo2 from "../../assets/images/memlogo2.png";
import memlogo3 from "../../assets/images/memlogo3.png";
import memlogo4 from "../../assets/images/memlogo4.png";
import memlogo5 from "../../assets/images/memlogo5.png";
import memlogo6 from "../../assets/images/memlogo6.png";
import memlogo7 from "../../assets/images/memlogo7.png";
import memlogo8 from "../../assets/images/memlogo8.png";
import memlogo9 from "../../assets/images/memlogo9.png";
import memlogo10 from "../../assets/images/memlogo10.png";
import memlogo11 from "../../assets/images/memlogo11.png";
import memlogo12 from "../../assets/images/memlogo12.png";
import memlogo13 from "../../assets/images/memlogo13.png";
import memlogo14 from "../../assets/images/memlogo14.png";
import memlogo15 from "../../assets/images/memlogo15.png";
import memlogo16 from "../../assets/images/memlogo16.png";


const About = () => {

  const MemberMahaka = [
    {id:"1",logo:memlogo1},
    {id:"2",logo:memlogo2},
    {id:"3",logo:memlogo3},
    {id:"4",logo:memlogo4},
    {id:"5",logo:memlogo5},
    {id:"6",logo:memlogo6},
    {id:"7",logo:memlogo7},
    {id:"8",logo:memlogo8},
    {id:"9",logo:memlogo9},
    {id:"10",logo:memlogo10},
    {id:"11",logo:memlogo11},
    {id:"12",logo:memlogo12},
    {id:"13",logo:memlogo13},
    {id:"14",logo:memlogo14},
    {id:"15",logo:memlogo15},
    {id:"16",logo:memlogo16},

  ]
  
  return (
    <>
  <div className="bg-gray-200 min-h-screen px-7 py-3 overflow-hidden">
  <div className="flex flex-wrap items-center">
    <h1 className="font-medium text-2xl md:text-4xl my-2 text-slate-700 mx-2">ABOUT</h1>
    {/* <img
      src={mahakalogo}
      alt="mahaka logo"
      className="h-10 md:h-15 w-auto ml-auto md:my-2 opacity-80"
    /> */}
  </div>

  {/* Mahaka x section */}


  <div className = "grid md:grid-cols-2">
  <div>
    <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl mb-4">MAHAKA X</h1>
   
    <p className = "text-lg text-slate-600 mx-2 mb-5 mt-2 text-left grid ">PT Mahaka Media Tbk (Mahaka X) is a public company working on creative industries, media and entertainment business units from Digital media, Creators Management, Media Agencies, IP & Creative
       Powerhouse to Web3. PT Mahaka Media Tbk. can be accessed on the stock exchange on April 3 2002.</p>
       
       <p className = "text-lg text-slate-600 mx-2 mt-2 text-left mb-5 ">PT Mahaka Media Tbk founded in 1992 and is the holding company of various creative, media and entertainment business units from Digital media, Creators Management, Media Agencies, IP & Creative Powerhouse to Web3.
Since it's emergence, Mahaka Media has been evolving and adapting to constant changes happening in the industry. Now, Mahaka Media aims to become the leading, most complete creative
 ecosystem in Indonesia, by empowering the industry and its people. That's why Mahaka Media is transforming into Mahaka X in 2022.</p>
 </div>

 {/* circle logo */}

 <div
  className="relative bg-white shadow-lg rounded-full h-80 w-80 md:h-90 md:w-90 bg-cover bg-center bg-no-repeat md:ml-30 overflow-hidden"
  style={{ backgroundImage: `url('path_to_your_background_image')` }}
>
  <div className="flex items-center justify-center h-full">
    <img
      src={mahakalogo2}
      alt="logo"
      className="h-45 w-auto opacity-90"
    />
  </div>
</div>


 
 
 
 </div>
  
  

  {/* mahaka attraction section */}


  <div className = "">
  <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl text-left mt-4">MAHAKA ATTRACTION</h1>
  {/* <p className = "text-lg text-slate-600 mx-2 my-2 text-left">PT Mahaka Visual Indonesia (Mahaka Attraction) is a part of Mahaka Media Group. Mahaka Attraction became a company that focuses on hospitality companies including recreation operators, tourist attractions with financial analysis and projections, consultants, 
    operations, marketing and promotions, branding agencies, etc.</p> */}
    </div>

    {/* attraction logos */}
    <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-10 mx-2">
      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo1}
          alt="logo 1"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo2}
          alt="logo 2"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo3}
          alt="logo 3"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo4}
          alt="logo 4"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo5}
          alt="logo 5"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo6}
          alt="logo 6"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>

      <div className="border text-orange-400 rounded-lg p-2 flex justify-center hover:scale-105 transition-transform">
        <img
          src={logo7}
          alt="logo 7"
          className="h-20 md:h-30 w-auto opacity-80"
        />
      </div>
    </div>
    <hr className = "text-gray-300"/>

   

    {/* mari and block diagram section */}

    <div className = "grid md:grid-cols-2">
      <div>
        <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl text-left mb-4">MARI</h1>
        <p className = "text-lg text-slate-600 mx-2 text-left mt-3">PT Mahaka Radio Integra Tbk (MARI) is part of the Mahaka Media Group. </p>

               <p className = "text-lg text-slate-600 mx-2 text-left mt-1"> This company was founded in 2006 under the name PT Genta Sabda Nusantara, the parent company of the leading radio stations in Jakarta, Jak FM, and Gen FM. Became MARI in 2015. The company is a major audio content provider in the entertainment industry, through eight radio station brands, such as Jak FM, Gen FM, Mustang FM, Kis FM, and Hot FM. Through its subsidiaries, the company also develops an audio-based application called Noice, which provides various
           audio podcasts, audio books, original audio series, online radio, etc.</p>

           <img src = {logosub}
    className = "w-auto h-40 md:h-50 mx-2 opacity-80"
    alt = "sub dividelogo"
    />
          

         
      </div>
      
   {/* block diagram logo */}
      <div className ="flex justify-center">
    <img src = {logobd}
    className = "w-auto h-63 mx-2 opacity-80"
    alt = "bd logo"
    />
  </div>
    </div>

    <hr className = "text-gray-300"/>


{/* mahaka member section */}
    {/* <div className = "flex justify-start">
    <img src = {memlogo}
    className = "w-auto h-20 mx-2 opacity-80"
    alt = "mem logo"
    />
    </div> */}
     <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl text-left mt-4 mb-6">MAHAKA MEMBER</h1>

    <div className = "grid grid-cols-3 md:grid-cols-6">
      {MemberMahaka.map(mem=>(
          // console.log("iterate is",mem.id)
        <div key ={mem.id} className ="border rounded text-orange-400 mx-2 my-2 flex justify-center p-1 hover:scale-105 transition-transform">
          <img src={mem.logo}
          alt = "memlogo"
          className="w-auto h-15 opacity-80"/>
        
        </div>
      ))}
    </div>

    <div>
    <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl text-left mt-4 mb-4">OUR VISION</h1>
          
          <p className = "text-lg text-slate-600 mx-2 my-1 text-left">We aspire to empower creativity and intelligence to improve our society.</p>
       
          <h1 className="text-slate-700 font-bold mx-2 text-xl md:text-3xl text-left mt-4 mb-4">OUR MISSION</h1>
          <p className = "text-lg text-slate-600 mx-2 my-2 text-left">Transforming the community through a supercharged ecosystem of creativity, business, and techmology.</p>
    </div>


    


   

 
 
  
</div>

    </>
  );
};

export default About;
