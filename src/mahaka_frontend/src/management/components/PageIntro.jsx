import { HiOutlineMagnifyingGlass, HiOutlinePlus } from "react-icons/hi2";
import { motion } from "framer-motion";

const PageIntro = ({
  title,
  count,
  actionOnButton,
  isLoading,
  searchInput,
  setSearchInput,
  showBtn = true,
}) => {
  const animVar = {
    initial: { rotate: 0 },
    hover: { rotate: 90, transition: { duration: 0.2 } },
  };

  return (
    <div className="flex bg-card text-text flex-auto flex-col justify-between px-6 py-8 sm:flex-row md:flex-col md:px-8 border-b border-border">
      <div>
        <div className="text-4xl font-extrabold leading-none tracking-tight">
          {title}
        </div>
        {isLoading ? (
          <span className="ml-0.5 font-medium animate-pulse bg-gray-400 text-gray-400 rounded">
            Loading...
          </span>
        ) : (
          <div className="text-secondary ml-0.5 font-semibold">
            {count} {count > 1 ? `${title}s` : title}
          </div>
        )}
        <div className="mt-4 flex items-center sm:mt-0 md:mt-4">
          <div className="flex-auto">
            <div className="px-4 border border-border rounded-full flex items-center gap-2">
              <HiOutlineMagnifyingGlass size={24} className="text-gray-500" />
              <input
                type="text"
                className="w-full my-3 outline-none bg-transparent"
                placeholder={`Search ${title}...`}
                search={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
          {showBtn && (
            <motion.button
              initial="initial"
              whileHover="hover"
              className={`ml-4 py-3 px-4 min-w-max flex gap-1 items-center justify-center ${
                isLoading ? "bg-gray-400" : "bg-secondary hover:bg-orange-600"
              } h-full text-white font-medium rounded-full`}
              onClick={isLoading ? null : actionOnButton}
            >
              <motion.div variants={animVar}>
                <HiOutlinePlus color="white" strokeWidth={3} size={12} />
              </motion.div>
              <span>New {title}</span>
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageIntro;
