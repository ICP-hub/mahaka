import { useSelector } from "react-redux";
import VenueBookingCard from "./VenueBookingCard";

const UserBookingData = () => {
  const { venues, loading } = useSelector((state) => state.venues);
  return loading ? (
    <h1>Lodaing...</h1>
  ) : (
    <div className="h-full w-full p-2 md:p-8 bg-white rounded-lg">
      <h1 className="py-4 text-2xl font-semibold">My Venues</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        {venues.map((venue, index) => (
          <VenueBookingCard venueDetail={venue} key={index} />
        ))}
      </div>
    </div>
  );
};

export default UserBookingData;
