const ScreenOverlay = ({ onOverlayClicked }) => {
  return (
    <div
      className="flex md:hidden fixed min-h-screen z-[170] inset-0 bg-[#0009]"
      onClick={onOverlayClicked}
    ></div>
  );
};

export default ScreenOverlay;
