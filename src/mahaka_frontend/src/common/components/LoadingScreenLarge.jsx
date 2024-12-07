import { InfinitySpin } from "react-loader-spinner";

const LoadingScreenLarge = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center">
        <InfinitySpin
          visible={true}
          width="200"
          color="black"
          ariaLabel="infinity-spin-loading"
          className="h-96 w-96"
        />
        <div className="font-black text-xl animate-pulse">Loading...</div>
      </div>
    </div>
  );
};

export default LoadingScreenLarge;
