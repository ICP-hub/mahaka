import React from "react";
import fram1 from "../../assets/images/fram1.png";

const Ticket = ({ ticket }) => {
  console.log(ticket, "ticketssss");
  const convertNanosecondsToDate = (nanoseconds) => {
    // Convert BigInt nanoseconds to milliseconds (regular number)
    const milliseconds = Number(nanoseconds) / 1e6;

    // Create a new Date object
    const date = new Date(milliseconds);

    // Define options for formatting the date and time
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour clock format
    };

    // Format the date and time to get the desired format
    return date.toLocaleString("en-US", options);
  };

  function convertTimestampToDateString(timestamp) {
    let date;

    // Check if timestamp is in milliseconds or nanoseconds
    if (timestamp >= 1_000_000_000_000n && timestamp < 1_000_000_000_000_000n) {
      // Milliseconds: Convert to number and create a Date object
      date = new Date(Number(timestamp));
    } else if (timestamp >= 1_000_000_000_000_000n) {
      // Nanoseconds: Convert to milliseconds and create a Date object
      date = new Date(Number(timestamp / 1_000_000n));
    } else {
      throw new Error("Invalid timestamp format.");
    }

    // Format the date into "Day, DD MMM YYYY" format
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="flex w-full max-w-3xl border border-white bg-opacity-50 z-100  rounded-md shadow-lg overflow-hidden">
      {/* Left Section */}
      <div className="w-4/5 p-6">
        <h1 className="text-3xl lg:text-3xl font-bold text-gray-900 mb-2">
          Welcome to the Mahaka Zone
        </h1>
        <p className="text-gray-600 text-base lg:text-1xl mb-6">
          A destination for thrilling venues , events and Wahana rides, creating
          unforgettable experiences.
        </p>
        {/* Ticket Information */}
        <table className="table-auto border-collapse border border-gray-500 m-2 w-full text-sm lg:text-base">
          <tbody>
            {/* Row 1 */}
            <tr>
              <td className="border border-gray-500 px-3 lg:px-5 py-2 text-center text-lg lg:text-3xl font-bold">
                E-Ticket
              </td>
              <td className="border border-gray-500 px-3 lg:px-5 py-2 text-center">
                <p className="text-gray-500">ID: {ticket?.categoryId}</p>
              </td>
            </tr>
            {/* Row 2 */}
            <tr>
              <td className="border border-gray-500 px-3 lg:px-5 py-2 text-center text-sm lg:text-xl text-gray-900">
                {convertTimestampToDateString(ticket?.saleDate)}
              </td>
              <td className="border border-gray-500 px-3 lg:px-5 py-2 text-center font-bold text-sm lg:text-base text-blue-600">
                Price:Rp{ticket?.price}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-full flex   justify-end items-center gap-1  ">
          <div className="font-bold ">Ticket created at - </div>
          {convertNanosecondsToDate(ticket.createdAt)}
        </div>
      </div>

      {/* Center Section (Logo) */}

      {/* Right Section */}
      <div className="w-1/5 bg-primary text-white flex flex-col items-center justify-between relative py-6 px-3">
        <div className="absolute left-0 top-0 h-full w-1">
          <div className="h-full bg-transparent flex flex-col items-center">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-3 bg-white mb-2 last:mb-0"
                style={{ borderRadius: "2px" }}
              ></div>
            ))}
          </div>
        </div>
        {/* Wrapper for QR Code and Rotated Content */}
        <div className="flex flex-col items-center justify-between h-full w-full">
          {/* QR Code Section */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-20 bg-white transform -rotate-90">
              <img
                src={ticket?.banner}
                alt="QR Code"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Rotated Content Section */}
          <div
            className="flex flex-col items-center justify-center 
                        md:transform md:-rotate-90"
            style={{ transformOrigin: "center" }}
          >
            <p className="text-center text-white pb-2 md:pb-3 tracking-wide">
              Please present this ticket at the entrance
            </p>
            {/* <p className="text-center text-base">
               Questions? <br />
               <span className="font-semibold">987 654 321</span>
             </p> */}
          </div>
        </div>

        {/* Decorative Cut-Out */}
        <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full -right-6 shadow-md"></div>
      </div>
    </div>
  );
};

export default Ticket;
