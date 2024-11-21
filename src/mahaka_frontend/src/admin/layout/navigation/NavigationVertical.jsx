import { motion } from "framer-motion";
import LogoSection from "../../components/navigation/LogoSection";
import ProfileSection from "../../components/navigation/ProfileSection";
import MenuSection from "../../components/navigation/MenuSection";

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
      className="min-w-64 max-w-64 bg-primary border-r-border border-r z-[200] fixed md:sticky h-screen no-scrollbar overflow-y-auto pb-8"
    >
      <LogoSection />
      <ProfileSection />
      <MenuSection />
    </motion.div>
  );
};

export default NavigationVertical;
