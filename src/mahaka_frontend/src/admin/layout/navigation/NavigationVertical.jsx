import { motion } from "framer-motion";

const NavigationVertical = ({ navigationState }) => {
  // Animation Variants for navigation
  const animationVariants = {
    open: {
      marginLeft: 0,
      transition: { duration: 0.3 },
    },
    closed: {
      marginLeft: -256,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      variants={animationVariants}
      initial={navigationState.isOpen ? "open" : "closed"}
      animate={navigationState.isOpen ? "open" : "closed"}
      className="min-w-64 max-w-64 bg-primary border-border border-r z-[200] fixed md:sticky h-full"
    >
      Navigation vertical
    </motion.div>
  );
};

export default NavigationVertical;
