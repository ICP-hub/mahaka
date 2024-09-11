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
          className="bg-[#0009] p-0 md:p-8 fixed inset-0 z-999 grid place-items-center cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            transition={{ ease: "easeInOut", duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="md:rounded-2xl w-full max-w-xl cursor-default relative overflow-hidden bg-card shadow-lg text-text"
          >
            <div className="flex justify-between px-6 py-4 items-center text-secondary border-b border-border">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button onClick={() => setIsOpen(false)} className="ml-4">
                <MdClose size={16} />
              </button>
            </div>
            <div className="relative z-10 p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto custom-scroll">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalOverlay;
