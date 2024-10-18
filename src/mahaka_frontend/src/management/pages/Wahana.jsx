import { HiMagnifyingGlass } from "react-icons/hi2";
import wahanaDummy1 from "../../assets/images/wahana1.jpg";
import { FaRupiahSign } from "react-icons/fa6";

const MgtWahana = () => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 flex min-w-0 flex-col overflow-y-auto">
        <div className="dark relative flex-0 overflow-hidden bg-gray-800 px-4 py-8 sm:p-16">
          <svg
            viewBox="0 0 960 540"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMax slice"
            xmlns="http://www.w3.org/2000/svg"
            class="absolute inset-0 pointer-events-none"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-width="100"
              class="text-gray-700 opacity-25"
            >
              <circle r="234" cx="196" cy="23"></circle>
              <circle r="234" cx="790" cy="491"></circle>
            </g>
          </svg>
          <div className="relative z-10 flex flex-col items-center text-text">
            <div className="text-xl font-semibold">MAHAKA'S</div>
            <div className="text-center text-4xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Wahana
            </div>
          </div>
        </div>
        <WahanaMain />
      </div>
    </div>
  );
};

const WahanaMain = () => {
  return (
    <div className="flex flex-auto p-6 sm:p-10">
      <div className="mx-auto flex w-full max-w-xs flex-auto flex-col sm:max-w-5xl">
        <div className="flex w-full max-w-xs flex-col items-center justify-between sm:max-w-none sm:flex-row">
          <div className="flex items-center">
            <select
              name=""
              id=""
              className="bg-card  text-icon px-4 min-h-12 rounded-md border border-border sm:w-36"
            >
              <option value="" className="min-h-12">
                All
              </option>
              <option value="" className="min-h-12">
                Event One
              </option>
              <option value="" className="min-h-12">
                Event Two
              </option>
              <option value="" className="min-h-12">
                Event three
              </option>
            </select>
            <div className="px-4 mt-4 w-full sm:ml-4 sm:mt-0 sm:w-72 min-h-12 rounded-md border border-border flex items-center bg-card text-icon">
              <HiMagnifyingGlass size={20} />
              <input
                type="text"
                placeholder="Search wahanas"
                className="w-full bg-transparent outline-none ml-4"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3">
          <WahanaCard />
          <WahanaCard />
          <WahanaCard />
          <WahanaCard />
        </div>
      </div>
    </div>
  );
};

const WahanaCard = () => {
  return (
    <div className="bg-card flex h-96 flex-col overflow-hidden rounded-2xl shadow relative group">
      <div className="flex flex-col relative">
        <div className="flex items-center justify-between p-6 z-10">
          <div className="rounded-full px-3 py-0.5 text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-500 dark:text-blue-50">
            Event One
          </div>
        </div>
        <div
          className="absolute h-60 w-full inset-0 saturate-100 md:saturate-0 md:group-hover:saturate-100 group-hover:scale-110 transition-all duration-500"
          style={{
            backgroundImage: `url(${wahanaDummy1})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
      <div className="mt-auto flex w-full flex-col p-6">
        <div className="text-lg font-medium">Wahana one</div>
        <div className="text-secondary mt-0.5 line-clamp-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
          eius natus obcaecati beatae commodi corrupti accusamus cupiditate
          doloremque veniam vel!
        </div>
        <div className="flex items-baseline whitespace-nowrap">
          <div className="mr-2 text-2xl">IDR</div>
          <div className="text-6xl font-semibold leading-tight tracking-tight">
            6
          </div>
          <div className="text-secondary text-2xl">/person</div>
        </div>
      </div>
    </div>
  );
};

export default MgtWahana;
