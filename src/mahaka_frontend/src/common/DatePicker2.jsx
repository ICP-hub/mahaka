import React, { useState } from "react";
import ColorCalender from "../assets/images/calender-color.svg";
import { HiArrowLeftCircle, HiArrowRightCircle } from "react-icons/hi2";

const DatePicker = ({ timestemp, setTimeStemp, startTime, endTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Convert nanoseconds to milliseconds and normalize to midnight
  const startMillis = new Date(Number(startTime / 1_000_000n));
  startMillis.setHours(0, 0, 0, 0); // Normalize to midnight
  const endMillis = new Date(Number(endTime / 1_000_000n));
  endMillis.setHours(0, 0, 0, 0); // Normalize to midnight

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    selectedDate.setHours(0, 0, 0, 0); // Normalize time to midnight

    if (
      selectedDate.getTime() >= startMillis.getTime() &&
      selectedDate.getTime() <= endMillis.getTime()
    ) {
      // Convert selected date back to nanoseconds
      setTimeStemp(BigInt(selectedDate.getTime()) * 1_000_000n);
      setIsOpen(false);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const startDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const calendarDays = Array.from({ length: startDay }, () => null).concat(
    days
  );

  return (
    <div className="relative md:min-w-96">
      <div
        className="border border-gray-400 rounded-lg p-2 flex items-center justify-between cursor-pointer bg-white shadow-md"
        onClick={toggleCalendar}
      >
        <input
          type="text"
          value={
            timestemp
              ? new Date(Number(timestemp / 1_000_000n)).toDateString()
              : ""
          }
          placeholder="Select a date"
          readOnly
          className="w-full bg-transparent border-none text-gray-800 font-semibold"
        />
        <img
          src={ColorCalender}
          alt="calendar-pic"
          className="h-6 w-6 object-contain"
        />
      </div>
      {isOpen && (
        <div className="mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-300">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
            >
              <HiArrowLeftCircle size={32} color="#f08e1e" />
            </button>
            <span className="font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
            >
              <HiArrowRightCircle size={32} color="#f08e1e" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center font-medium text-gray-700 bg-gray-200 border-b border-gray-300">
            <div className="py-2">Su</div>
            <div className="py-2">Mo</div>
            <div className="py-2">Tu</div>
            <div className="py-2">We</div>
            <div className="py-2">Th</div>
            <div className="py-2">Fr</div>
            <div className="py-2">Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1 p-2 font-medium">
            {calendarDays.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-10 w-10"></div>;
              }

              const date = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                day
              );
              date.setHours(0, 0, 0, 0); // Normalize to midnight

              const isSelectable =
                date.getTime() >= startMillis.getTime() &&
                date.getTime() <= endMillis.getTime();
              const isSelected =
                timestemp &&
                date.toDateString() ===
                  new Date(Number(timestemp / 1_000_000n)).toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  onClick={() => isSelectable && handleDateClick(day)}
                  className={`p-2 rounded-full h-10 w-10 text-center cursor-pointer ${
                    isSelectable
                      ? isSelected
                        ? "bg-secondary text-white"
                        : isToday
                        ? "bg-primary text-white"
                        : "hover:bg-secondary hover:text-white"
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
