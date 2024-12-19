import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Ticket from "../MahakaTicket";

const UserBookingData = () => {
  const { backend } = useSelector((state) => state.authentication);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const chunkSize = 6; // Number of items per page

  const getTickets = async (page) => {
    try {
      setLoading(true);
      const res = await backend.getAllCallerTickets(chunkSize, page);
      console.log(res);
      setTickets(res.ok.data || []);
      setTotalPages(parseInt(res.ok.total_pages) || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tickets.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backend) {
      getTickets(page);
    }
  }, [backend, page]);

  const closeModal = () => setSelectedTicket(null);

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-md animate-pulse"
          >
            <div className="h-60 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm text-center mt-24">
          <h2 className="text-gray-800 text-lg font-bold mb-2">
            No Data Found
          </h2>
          <p className="text-gray-600 text-sm">
            Sorry, we couldn’t find any data to display. Please check back later
            or try refreshing the page.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-secondary text-white text-sm font-semibold rounded hover:bg-primary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full p-4 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {tickets.map((ticket, index) => (
          <div key={index}>
            <div className="relative p-4 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="absolute -top-4 -right-4 bg-secondary text-white text-xs font-bold rounded-full px-3 py-1 shadow-md">
                #{parseInt(ticket.ticketId)}
              </div>
              <div className="h-72 w-full bg-gray-200 rounded-md mb-4">
                <img
                  src={ticket.banner}
                  alt="Ticket Category"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {ticket.categoryId}
                </h2>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    <strong className="text-secondary">Visitors:</strong>{" "}
                    {parseInt(ticket.numOfVisitors)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong className="text-secondary">Price:</strong> ₹
                    {ticket.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(ticket)}
                className="w-full mt-4 py-2 bg-secondary text-white font-medium rounded-lg transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={page === 0}
          className={`px-4 py-2 text-white bg-secondary rounded ${
            page === 0 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
          className={`px-4 py-2 text-white bg-secondary rounded ${
            page >= totalPages - 1 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl relative">
            <Ticket ticket={selectedTicket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBookingData;
