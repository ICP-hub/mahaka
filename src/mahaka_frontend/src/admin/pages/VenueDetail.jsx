import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVenue } from '../../redux/reducers/apiReducers/venueApiReducer';
import { formatDate } from '../../common/utils/dateFormater';
import VenueDemoImg from "@/assets/images/Frame10.png";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import UpdateVenueForm from "../components/UpdateVenueForm";

const formatTime = (time) => {
  if (typeof time === 'bigint') {
    time = Number(time);
  }
  if (typeof time === 'number') {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = ((hours + 11) % 12 + 1);
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  }
  return time;
};

const VenueDetailPage = () => {
  const { title, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentVenue, loading, error } = useSelector((state) => state.venues);
  const { backend } = useSelector((state) => state.auth);
  const [localError, setLocalError] = useState(null);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLocalError("Venue ID is missing from the URL");
      return;
    }

    if (!backend) {
      setLocalError("Backend is not initialized");
      return;
    }

    dispatch(getVenue({ backend, venueId: id }))
      .unwrap()
      .catch((err) => {
        setLocalError(err.message || "Failed to fetch venue details");
      });
  }, [dispatch, id, backend]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || localError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error || localError}</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate('/admin/venues')}
        >
          Back to Venues List
        </button>
      </div>
    );
  }

  const venue = currentVenue && Array.isArray(currentVenue) ? currentVenue[1] : null;

  if (!venue) {
    return <div className="p-6">No venue data available.</div>;
  }

  return (
    <div className="p-6 tracking-wide">
      <div className="flex flex-col md:flex-row items-start md:items-center mb-6 ">
        <div className="w-full md:w-1/2 h-64 bg-gray-200 mb-4 md:mb-0 rounded-lg shadow-lg">
          <img
            src={VenueDemoImg}
            alt="Venue Banner"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-5xl font-bold mb-4">{venue.Title}</h1>
          <div className="mb-2 leading-relaxed">
            <p className="text-lg"><strong>📅 </strong>{formatDate(venue.Details.StartDate)} - {formatDate(venue.Details.EndDate)}</p>
          </div>
          <div className="mb-2 leading-relaxed">
            <p className="text-lg"><strong>🕒 </strong>{formatTime(venue.Details.StartTime)} - {formatTime(venue.Details.EndTime)}</p>
          </div>
          <div className="mb-2 leading-relaxed">
            <p className="text-lg"><strong>Location:</strong> {venue.Details.Location}</p>
          </div>
          <button
            className="px-4 py-2 mt-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
            onClick={() => setIsUpdateModalOpen(true)}
          >
            Update Venue
          </button>
        </div>
      </div>
      <hr className="border-gray-300 my-6" />

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p>{venue.Description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Capacity</h2>
        <p>{venue.capacity ? venue.capacity.toString() : 'Capacity information not available.'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Events</h2>
        {venue.Events && venue.Events.length > 0 ? (
          <ul>
            {venue.Events.map((event, index) => (
              <li key={index} className="hover:underline">{event.Title}</li>
            ))}
          </ul>
        ) : (
          <div>
            <p>No events available for this venue.</p>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600"
          onClick={() => navigate('/admin/venues')}
        >
          Back to Venues
        </button>
      </div>

      {/* Modal for updating the venue */}
      {isUpdateModalOpen && (
        <ModalOverlay
          isOpen={isUpdateModalOpen}
          setIsOpen={setIsUpdateModalOpen}
          title="Update Venue"
        >
          <UpdateVenueForm venue={venue} setIsModalOpen={setIsUpdateModalOpen} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default VenueDetailPage;
