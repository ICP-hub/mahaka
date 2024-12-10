import React from "react";
import gen98 from "../../assets/logos-mahaka/gen98.png";
import gen103 from "../../assets/logos-mahaka/gen103.png";
import jaktv from "../../assets/logos-mahaka/jaktv.png";
import kissfm from "../../assets/logos-mahaka/kissifm.png";
import mostradio from "../../assets/logos-mahaka/mostradio.png";
import mustang from "../../assets/logos-mahaka/mustang.png";
import hotfm from "../../assets/logos-mahaka/hotfm.png";
import noice from "../../assets/logos-mahaka/noice.png";
import republica from "../../assets/logos-mahaka/republica.png";
import republicapen from "../../assets/logos-mahaka/republikapen.png";
import inspire from "../../assets/logos-mahaka/inspire.png";
import jakfm from "../../assets/logos-mahaka/jakfm.png";
import otegomedia from "../../assets/logos-mahaka/otegomedia.png";
import creativeintel from "../../assets/logos-mahaka/creativeintel.png";
import doogether from "../../assets/logos-mahaka/doogether.png";
import goers from "../../assets/logos-mahaka/goers.png";
import alive from "../../assets/logos-mahaka/alive.png";
import mahakaat from "../../assets/logos-mahaka/mahakaat.png";
import mari from "../../assets/logos-mahaka/mari.png";
import mahakasq from "../../assets/logos-mahaka/mahakasq.png";
import flowimg from "../../assets/logos-mahaka/flow.png";
import flow2 from "../../assets/logos-mahaka/flow2.png";

const About = () => {
  return (
    <div className="flex min-w-0 flex-auto flex-col">
      <div className="bg-card">
        <div className="container mx-auto flex flex-0 flex-col p-6 dark:bg-transparent sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-8 font-medium">
          <div className="min-w-0 flex-1">
            {/* <div className="whitespace-nowrap text-indigo-500">MAHAKA'S</div> */}
            <div className="mt-2">
              <h2 className="truncate text-3xl font-extrabold leading-7 tracking-tight sm:leading-10 md:text-4xl">
                About Us
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-auto p-6 sm:p-10 container mx-auto font-medium">
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">Mahaka</h2>
        <p className="mb-4">
          PT Mahaka Media Tbk founded in 1992 and is the holding company of
          various creative, media and entertainment business units from Digital
          media, Creators Management, Media Agencies, IP & Creative Powerhouse
          to Web3.
        </p>
        <p className="my-4">
          Since it's emergence, Mahaka Media has been evolving and adapting to
          constant changes happening in the industry. Now, Mahaka Media aims to
          become the leading, most complete creative ecosystem in Indonesia, by
          empowering the industry and its people. That's why Mahaka Media is
          transforming into Mahaka X in 2022. Indonesia is one of the largest
          countries in the world with a population of 278.700.000 people spread
          across 38 provinces. Indonesia itself is the largest archipelagic
          country in the world and has a variety of cultures, history, flora,
          fauna and abundant natural wealth. Indonesia is a very strategic
          country for international trade because it is located among developing
          countries so it is easy to market production. Because Indonesia is
          located on international trade routes, the Indonesian language is
          enriched by various foreign languages of traders. Indonesia is easy to
          communicate and establish relations with other countries so that good
          international relations are established with other countries.
        </p>
        <p>
          Mahaka X focuses towards a new creative economy that empower creators,
          communities, conversations, and commerce. These aspects are
          well-represented in our core business units such as Republika (Content
          & Publishing), Inspire (Marketing Services), Xpose (Creators &
          Community) and Creativelntel (Creative IP Powerhouse) At mahaka X, we
          strive to always incorporate business, media, technology and
          creativity altogether, in order to bring sustainable growth through a
          complete creative ecosystem.
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
          Mahaka Attraction
        </h2>
        <p className="mb-8">
          PT Mahaka Visual Indonesia (Mahaka Attraction) is a part of Mahaka
          Media Group. Mahaka Attraction became a company that focuses on
          hospitality companies including recreation operators, tourist
          attractions with financial analysis and projections, consultants,
          operations, marketing and promotions, branding agencies, etc.
        </p>
        <div>
          <img
            src={flowimg}
            alt="mahaka_flow"
            className="object-contain h-60"
          />
        </div>
        <p className="mt-8 mb-4">
          "Ecosystem" is our concept, idea and creativity make an entertainment
          to be different and more exciting and also to satisfy the consumers
          and our strategic partner too.
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
          Ecosystem circular ticketing mahaka's venue/year
        </h2>
        <div className="flex w-full text-2xl flex-col max-w-xl">
          <div className="flex items-center py-2">
            <div className="flex-grow">1. Gowet Waterpark</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">400.000 Visitors</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex-grow">2. Keong Emas Theater</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">400.000 Visitors</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex-grow">3. Autopia Park</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">1.000.000 Visitors</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex-grow">4. Aqua Gamepark</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">200.000 Visitors</div>
          </div>
          <div className="text-lg font-semibold mt-4">Partner's Venue</div>
          <div className="flex items-center py-2">
            <div className="flex-grow">5. Taman Pintar</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">1.000.000 Visitors</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex-grow">6. Taman Mini Indonesia Indah</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">5.000.000 Visitors</div>
          </div>
          <div className="flex items-center py-2">
            <div className="flex-grow">7. Bali Bird Park</div>
            <div className="w-12 text-center">:</div>
            <div className="flex-shrink-0">200.000 Visitors</div>
          </div>
        </div>
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">
          We propose to develop program apps using taken by Mahaka in our
          ecosystem first and gradually expand to partner's venue.
        </h2>
        <p>— Developing program apps</p>
        <p>— Developing promotion</p>
        <p>— Branding campaign</p>
        <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">
          Ecosystem contents Mahaka's Attraction
        </h2>
        <p>
          1. Production movies for Keong Emas Theater for 10 movies each movie
          has consist of indonesia :
        </p>
        <p>— Humanity</p> <p>— Culture</p> <p>— Tourism Production</p>
        <p> Cost each movie: USD 70.000 x 10 = USD 700.000, 3 Movie/year.</p>
        <p>
          2. Recreation center of tourist destination experiencing with movie
          that we produced, so we build the facility and recreation center
          become tourism movie.
        </p>
        <div>
          <img src={flow2} alt="mahaka_flow" className="object-contain h-128" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">MARI</h2>
        <p>
          PT Mahaka Radio Integra Tbk (MARI) is part of the Mahaka Media Group.
          This company was founded in 2006 under the name PT Genta Sabda
          Nusantara, the parent company of the leading radio stations in
          Jakarta, Jak FM, and Gen FM. Became MARI in 2015. The company is a
          major audio content provider in the entertainment industry, through
          eight radio station brands, such as Jak FM, Gen FM, Mustang FM, Kis
          FM, and Hot FM. Through its subsidiaries, the company also develops an
          audio-based application called Noice, which provides various audio
          podcasts, audio books, original audio series, online radio, etc.
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
          Our Vision
        </h2>
        <p>
          We aspire to empower creativity and intelligence to improve our
          society
        </p>
        <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
          Our Mission
        </h2>
        <p>
          Transforming the community through a supercharged ecosystem of
          creativity, business, and technology.
        </p>
        <div className="">
          <h2 className="text-3xl font-bold text-slate-900 mt-8 mb-4">
            Our Members
          </h2>
          <div className="flex flex-wrap justify-center items-center">
            <img src={gen98} alt="logo_img1" className="h-24 w-auto mx-2" />
            <img src={gen103} alt="logo_img2" className="h-24 w-auto mx-2" />
            <img src={jaktv} alt="logo_img3" className="h-24 w-auto mx-2" />
            <img src={kissfm} alt="logo_img4" className="h-24 w-auto mx-2" />
            <img src={mostradio} alt="logo_img5" className="h-24 w-auto mx-2" />
            <img src={mustang} alt="logo_img6" className="h-24 w-auto mx-2" />
            <img src={hotfm} alt="logo_img7" className="h-24 w-auto mx-2" />
            <img src={noice} alt="logo_img8" className="h-24 w-auto mx-2" />
            <img src={republica} alt="logo_img9" className="h-24 w-auto mx-2" />
            <img
              src={republicapen}
              alt="logo_img10"
              className="h-24 w-auto mx-2"
            />
            <img src={inspire} alt="logo_img11" className="h-24 w-auto mx-2" />
            <img src={jakfm} alt="logo_img12" className="h-24 w-auto mx-2" />
            <img
              src={otegomedia}
              alt="logo_img13"
              className="h-24 w-auto mx-2"
            />
            <img
              src={creativeintel}
              alt="logo_img14"
              className="h-24 w-auto mx-2"
            />
            <img
              src={doogether}
              alt="logo_img15"
              className="h-24 w-auto mx-2"
            />
            <img src={goers} alt="logo_img16" className="h-24 w-auto mx-2" />
            <img src={alive} alt="logo_img17" className="h-24 w-auto mx-2" />
            <img src={mahakaat} alt="logo_img18" className="h-24 w-auto mx-2" />
            <img src={mari} alt="logo_img19" className="h-24 w-auto mx-2" />
            <img src={mahakasq} alt="logo_img20" className="h-24 w-auto mx-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
