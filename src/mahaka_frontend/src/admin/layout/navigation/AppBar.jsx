import { MdMenu } from "react-icons/md";
import ButtonWrapper from "../../../common/ButtonWrapper";

const AppBar = ({ toggleNavigation }) => {
  return (
    <div className="bg-card relative z-49 flex h-16 w-full flex-0 items-center px-4 shadow dark:border-b dark:bg-transparent dark:shadow-none md:px-6 print:hidden">
      <ButtonWrapper
        size={24}
        color="text-icon hover:text-secondary"
        actionOnButtonClick={() => toggleNavigation()}
      >
        <MdMenu />
      </ButtonWrapper>
    </div>
  );
};

export default AppBar;
