import {
  MdDateRange,
  MdLocationOn,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import FrameDemoImg from "../../../assets/images/Frame10.png";
const VenueDetailView = ({ venueDetail }) => {
  return (
    <div className="flex flex-col p-2 gap-4">
      <div className="grid md:grid-cols-2">
        <img
          src={FrameDemoImg}
          alt={venueDetail.Title}
          className="rounded-lg"
        />
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
        </div>
      </div>
      <div className="py-4 divide-y-2 divide-gray-300">
        <span className="flex w-full justify-between items-center py-4">
          <p>Mini Gate Pass</p>
          <p>Rp.50000*2</p>
        </span>
        <span className="flex w-full justify-between items-center font-semibold py-4">
          <p>Total</p>
          <p>Rp.100000</p>
        </span>
        <span className="flex w-full justify-between items-center py-4">
          <p>Payment Via</p>
          <p>Credit Card</p>
        </span>
      </div>
      <button className="px-4 py-2 rounded-md bg-secondary text-white">
        Download Receipt
      </button>
    </div>
  );
};

export default VenueDetailView;
