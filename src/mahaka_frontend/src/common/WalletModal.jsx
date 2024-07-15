import NFIDImg from "/nfid.png";
import InternetIdentity from "/dfinity.svg";
import { motion } from "framer-motion";
import { useAuth } from "../auth/useAuthClient";

const WalletModal = ({ onModalClose }) => {
  const { login } = useAuth();

  const walletOptions = [
    {
      id: "ii",
      content: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          className="sm:px-12 px-8 py-4 sm:py-6 text-lg font-medium sm:text-2xl flex items-center gap-4 hover:bg-foreground"
        >
          <img
            src={InternetIdentity}
            className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
          />
          <span>Internet Identity</span>
        </motion.div>
      ),
    },
    {
      id: "nfid",
      content: (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1 }}
          className="sm:px-12 px-8 py-4 sm:py-6 text-lg font-medium sm:text-2xl flex items-center gap-4 hover:bg-foreground"
        >
          <img
            src={NFIDImg}
            className="max-h-16 min-h-16 max-w-16 min-w-16 object-contain"
          />
          <span>NFID</span>
        </motion.div>
      ),
    },
  ];

  const loginHandler = async (id) => {
    await login(id);
  };

  return (
    <div
      className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      onClick={onModalClose}
    >
      <div className="bg-card rounded-3xl overflow-hidden">
        {walletOptions.map((wallet) => (
          <div key={wallet.id} onClick={() => loginHandler(wallet.id)}>
            {wallet.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletModal;
