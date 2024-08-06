import React, { useState } from "react";
// import { HiCalendar } from "react-icons/hi";
import ColorCalender from "../assets/images/calender-color.svg";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { HiArrowRightCircle } from "react-icons/hi2";

const DatePicker = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const toggleCalendar = () => setIsOpen(!isOpen);

  const handleDateClick = (day) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    // Set the selected date only if it's within the current month
    if (newDate.getMonth() === currentDate.getMonth()) {
      setSelectedDate(newDate);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
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
  const calendarDays = Array.from({ length: startDay }, (_, i) => null).concat(
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
          value={selectedDate ? selectedDate.toDateString() : ""}
          placeholder="Select a date"
          readOnly
          className="w-full bg-transparent border-none text-gray-800 font-semibold"
        />
        <img
          src={ColorCalender}
          alt="calender-pic"
          className="h-6 w-6 object-contain"
        />
      </div>
      {isOpen && (
        <div className="mt-2 w-full bg-white border border-gray-300 shadow-lg rounded-lg z-10">
          <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-300">
            <button onClick={handlePrevMonth}>
              <HiArrowLeftCircle size={32} color="#f08e1e" />
            </button>
            <span className="font-semibold">
              {currentDate.toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button onClick={handleNextMonth}>
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
              const isToday =
                day &&
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ).toDateString() === today.toDateString();
              const isSelected =
                day &&
                selectedDate &&
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ).toDateString() === selectedDate.toDateString();
              const isInCurrentMonth =
                day &&
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  day
                ).getMonth() === currentDate.getMonth();
              return (
                <div
                  key={index}
                  onClick={() => day && handleDateClick(day)}
                  className={`p-2 rounded-full h-10 w-10 text-center cursor-pointer ${
                    isInCurrentMonth
                      ? isSelected
                        ? "bg-secondary text-white"
                        : isToday
                        ? "bg-primary text-white"
                        : "hover:bg-secondary hover:text-white"
                      : "text-gray-400 hover:bg-transparent"
                  }`}
                >
                  {day || ""}
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
