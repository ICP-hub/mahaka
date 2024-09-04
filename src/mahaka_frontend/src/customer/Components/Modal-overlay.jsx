import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const ModalOverlay = ({ isOpen, setIsOpen, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-slate-900/20 backdrop-blur p-0 md:p-8 fixed inset-0 z-999 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="md:rounded-2xl w-full max-w-xl cursor-default relative overflow-hidden bg-white shadow-lg"
          >
            <div className="flex justify-between px-8 py-4 items-center bg-secondary text-white">
              <h3 className="text-xl font-semibold text-center flex-1">
                {title}
              </h3>
              <button onClick={() => setIsOpen(false)} className="ml-4">
                <MdClose size={16} />
              </button>
            </div>
            <div className="relative z-10 p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto ">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalOverlay;
