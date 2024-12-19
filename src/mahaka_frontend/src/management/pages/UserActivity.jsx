import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Ticket from "../components/TicketModel";

const MgtUserActivity = () => {
  const { backend } = useSelector((state) => state.authentication);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0); // Initialize totalPages
  const [page, setPage] = useState(0); // Track current page
  const [selectedTicket, setSelectedTicket] = useState(null); // Selected ticket
  const chunkSize = 6; // Define chunk size

  const getTickets = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await backend.getAllCallerTickets(chunkSize, page);
      console.log(res);
      setTickets(res.ok.data || []);
      setTotalPages(parseInt(res.ok.total_pages)); // Set total pages from the response
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (backend) {
      getTickets();
    }
  }, [backend, page]); // Fetch tickets when backend or page changes

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  const closeModal = () => setSelectedTicket(null);

  return (
    <div className="relative flex flex-col min-w-0 flex-auto p-6 bg-card min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Ticket Purchase History</h1>
      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded mb-6">{error}</div>
      )}
      {loading ? (
        <div className="text-gray-400 text-center py-12">Loading...</div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-center text-gray-500 border border-gray-200">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  <th className="px-6 py-3 text-secondary">Ticket ID</th>
                  <th className="px-6 py-3 text-secondary">Id</th>
                  <th className="px-6 py-3 text-secondary">Price</th>
                  <th className="px-6 py-3 text-secondary">Num of Visitors</th>
                  <th className="px-6 py-3 text-secondary">Sale Date</th>
                  <th className="px-6 py-3 text-secondary">Payment Type</th>
                  <th className="px-6 py-3 text-secondary">Ticket Type</th>
                  <th className="px-6 py-3 text-secondary">View</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-gray-50 border-b transition-colors"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      {parseInt(ticket.ticketId)}
                    </td>
                    <td className="px-6 py-4 text-gray-800 truncate w-32">
                      {ticket.categoryId}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{ticket.price}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {parseInt(ticket.numOfVisitors)}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {new Date(
                        parseInt(ticket.createdAt) / 1e6
                      ).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {Object.keys(ticket.paymentType)[0]}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {Object.keys(ticket.ticketType)[0]}
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      <button
                        className="px-4 py-2 bg-secondary text-white rounded hover:bg-primary"
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4">
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
              Page: {page + 1} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages - 1}
              className={`px-4 py-2 text-white bg-secondary rounded ${
                page === totalPages - 1 && "opacity-50 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal for Selected Ticket */}
      {selectedTicket && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-xl w-[90%] max-w-2xl relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
              onClick={closeModal}
            >
              &times;
            </button>
            <Ticket ticket={selectedTicket} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MgtUserActivity;
