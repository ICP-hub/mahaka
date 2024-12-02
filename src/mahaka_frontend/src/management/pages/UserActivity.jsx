import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MgtUserActivity = () => {
  const { backend } = useSelector((state) => state.authentication);
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getTickets = async () => {
    try {
      const res = await backend.getAllCallerTickets(10, 0);
      console.log(res);
      setTickets(res.ok.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tickets.");
    }
  };

  useEffect(() => {
    if (backend) {
      getTickets();
    }
  }, [backend]);

  return (
    <div className="relative flex flex-col min-w-0 flex-auto p-6 bg-card min-h-screen">
      <h1 className="text-2xl font-bold mb-6 ">Ticket Purchase History</h1>
      {error && (
        <div className="text-red-600 bg-red-100 p-4 rounded mb-6">{error}</div>
      )}
      {loading ? (
        <div className="text-gray-400 text-center py-12">Loading...</div>
      ) : (
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
                    {new Date(parseInt(ticket.saleDate) / 1e6).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {Object.keys(ticket.paymentType)[0]}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {Object.keys(ticket.ticketType)[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MgtUserActivity;
