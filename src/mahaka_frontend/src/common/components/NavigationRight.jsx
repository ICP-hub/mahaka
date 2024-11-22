import { AnimatePresence, motion } from "framer-motion";

const NavigationRight = ({ isOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ marginRight: -640 }}
          animate={{ marginRight: 0 }}
          exit={{ marginRight: -640 }}
          transition={{ duration: 0.3 }}
          className="absolute md:relative right-0 top-0 left-0 bottom-0 w-full bg-card min-h-screen md:w-160 z-20 overflow-y-auto overflow-x-hidden custom-scroll md:border-l md:border-border"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationRight;
