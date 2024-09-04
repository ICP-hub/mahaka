const ScreenOverlay = ({ onOverlayClicked }) => {
  return (
    <div
      className="flex md:hidden h-screen w-screen z-[170] absolute inset-0 bg-[#0009]"
      onClick={onOverlayClicked}
    ></div>
  );
};

export default ScreenOverlay;
