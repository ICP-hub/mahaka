import {
  MdDateRange,
  MdLocationOn,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import FrameDemoImg from "../../../assets/images/Frame10.png";
import { useState } from "react";
import ModalOverlay from "../Modal-overlay";
import VenueDetailView from "./VenueDetailView";

const VenueBookingCard = ({ venueDetail }) => {
  const [isDetailView, setIsDetailView] = useState(false);
  return (
    <div>
      {isDetailView && (
        <ModalOverlay
          isOpen={isDetailView}
          setIsOpen={setIsDetailView}
          title="Venue Detail"
        >
          <VenueDetailView venueDetail={venueDetail} />
        </ModalOverlay>
      )}
      <div className="relative z-10 flex flex-col items-center overflow-hidden rounded-2xl border-2 border-gray-300 space-y-4">
        <div>
          <img src={FrameDemoImg} alt="venue-name" />
        </div>
        <div className="px-8 w-full">
          <h1 className="text-slate-600 text-xl font-bold capitalize pb-4">
            {venueDetail.Title}
          </h1>
          <div className="text-slate-600 space-y-2">
            <span className="flex items-center gap-4">
              <MdDateRange size={24} className="text-slate-600" />
              <p>
                {venueDetail.Details.StartDate} — {venueDetail.Details.EndDate}
              </p>
            </span>
            <span className="flex items-center gap-4">
              <MdOutlineAccessTimeFilled size={24} className="text-slate-600" />
              <p>
                {String(venueDetail.Details.StartTime)} —
                {String(venueDetail.Details.EndTime)}
              </p>
            </span>
            <span className="flex items-center gap-4">
              <MdLocationOn size={24} className="text-slate-600" />
              <p>{venueDetail.Details.Location}</p>
            </span>
          </div>
          <button
            className="px-2 py-6 hover:underline text-primary"
            onClick={() => setIsDetailView(true)}
          >
            View more details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueBookingCard;
