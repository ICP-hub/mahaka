import React, { useState } from 'react';
import Frame10 from "../../../assets/images/Frame10.png";

const Table = ({ data, itemsPerPage = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const ellipsis = <span key="ellipsis" className="px-2">...</span>;
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      
      if (currentPage > 3) {
        pageNumbers.push(ellipsis);
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push(ellipsis);
      }
      
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className=" border-b border-gray-200 tracking-wider">
          <tr>
            <th className="p-2 text-left font-semibold text-gray-600 hidden md:table-cell"></th>
            <th className="p-1 text-left font-semibold text-gray-600 hidden md:table-cell"></th>
            <th className="p-2 text-left font-semibold text-gray-600">Event Name</th>
            <th className="p-2 text-left font-semibold text-gray-600">Starting Date</th>
            <th className="p-2 text-left font-semibold text-gray-600 hidden md:table-cell">Ending Date</th>
            <th className="p-2 text-left font-semibold text-gray-600 hidden md:table-cell">Time</th>
            <th className="p-2 text-left font-semibold text-gray-600 hidden md:table-cell">Orders</th>
            <th className="p-2 text-left font-semibold text-gray-600 hidden md:table-cell">Status</th>
            <th className="p-2 text-left font-semibold text-gray-600">Tickets</th>
            <th className="p-1 text-left font-semibold text-gray-600"></th>
            <th className="p-2 text-left font-semibold text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index} className="border-b border-gray-200 tracking-wider">
              <td className="p-2  text-gray-700 hidden md:table-cell">
                <input type="checkbox" className="mr-2" />
              </td>
              <td className="p-1  text-gray-700 hidden md:table-cell">
                <img src={Frame10} alt="Event" className="w-8 h-8 rounded" />
              </td>
              <td className="p-2  text-gray-700">{row.eventName}</td>
              <td className="p-2  text-gray-700">{row.startingDate}</td>
              <td className="p-2  text-gray-700 hidden md:table-cell">{row.endingDate}</td>
              <td className="p-2  text-gray-700 hidden md:table-cell">{row.time}</td>
              <td className="p-2  text-gray-700 hidden md:table-cell">{row.orders}</td>
              <td className="p-2  text-gray-700 hidden md:table-cell">
                <span className={`inline-block px-2 py-1 rounded ${getStatusClass(row.status)}`}>
                  {row.status}
                </span>
              </td>
              <td className="p-2  text-gray-700">
                <button className={`px-2 py-1 rounded ${getTicketsClass(row.tickets)}`}>
                  {row.tickets}
                </button>
              </td>
              <td className="p-1 text-gray-700 text-center">
                <button className="text-gray-500 hover:text-gray-700 mr-2">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
              <td className="p-2 text-gray-700 text-center">
                <button className="text-gray-500 hover:text-gray-700 hidden md:block">
                  <i className="fas fa-arrow-right"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <div className="inline-flex items-center space-x-2">
          {getPageNumbers().map((page, index) => (
            React.isValidElement(page) ? (
              page
            ) : (
              <button
                key={index}
                className={`px-2 py-1 border rounded ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    default:
      return 'bg-yellow-100 text-yellow-700';
    case 'Ongoing':
      return 'bg-blue-100 text-blue-700';
    case 'Finished':
      return 'bg-red-100 text-red-700';
   
  }
};

const getTicketsClass = (tickets) => {
  return tickets === 'Sold out' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700';
};

export default Table;
