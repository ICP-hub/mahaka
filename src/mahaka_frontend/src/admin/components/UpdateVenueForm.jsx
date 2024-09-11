import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateVenue } from '../../redux/reducers/apiReducers/venueApiReducer';
import flatpickr from 'flatpickr';
import { FcAlarmClock, FcCalendar } from 'react-icons/fc';

const UpdateVenueForm = ({ venue, setIsModalOpen }) => {
    const dispatch = useDispatch();
    const { backend } = useSelector((state) => state.auth);
    const [venueData, setVenueData] = useState({
        Title: '',
        Description: '',
        Details: {
            StartDate: '',
            EndDate: '',
            StartTime: '',
            EndTime: '',
            Location: '',
        },
        capacity: '',
    });

    // Refs for Flatpickr
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const startTimeRef = useRef(null);
    const endTimeRef = useRef(null);

    useEffect(() => {
        // Initialize Flatpickr for dates
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        flatpickr(startDateRef.current, {
            dateFormat: 'Y-m-d',
            defaultDate: venueData.Details.StartDate,
            onChange: (selectedDates) => {
                const newStartDate = selectedDates[0] ? formatDate(selectedDates[0]) : '';
                setVenueData(prev => ({
                    ...prev,
                    Details: { ...prev.Details, StartDate: newStartDate }
                }));
            },
        });

        flatpickr(endDateRef.current, {
            dateFormat: 'Y-m-d',
            defaultDate: venueData.Details.EndDate,
            onChange: (selectedDates) => {
                const newEndDate = selectedDates[0] ? formatDate(selectedDates[0]) : '';
                setVenueData(prev => ({
                    ...prev,
                    Details: { ...prev.Details, EndDate: newEndDate }
                }));
            },
        });

        // Initialize Flatpickr for times
        flatpickr(startTimeRef.current, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            defaultDate: `1970-01-01 ${Math.floor(Number(venueData.Details.StartTime) / 60)}:${Number(venueData.Details.StartTime) % 60}`,
            onChange: (selectedDates) => {
                const newStartTime = selectedDates[0] ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes() : 0;
                setVenueData(prev => ({
                    ...prev,
                    Details: { ...prev.Details, StartTime: newStartTime.toString() }
                }));
            },
        });

        flatpickr(endTimeRef.current, {
            enableTime: true,
            noCalendar: true,
            dateFormat: 'H:i',
            defaultDate: `1970-01-01 ${Math.floor(Number(venueData.Details.EndTime) / 60)}:${Number(venueData.Details.EndTime) % 60}`,
            onChange: (selectedDates) => {
                const newEndTime = selectedDates[0] ? selectedDates[0].getHours() * 60 + selectedDates[0].getMinutes() : 0;
                setVenueData(prev => ({
                    ...prev,
                    Details: { ...prev.Details, EndTime: newEndTime.toString() }
                }));
            },
        });
    }, [venueData.Details.StartDate, venueData.Details.EndDate, venueData.Details.StartTime, venueData.Details.EndTime]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVenueData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setVenueData(prev => ({
            ...prev,
            Details: {
                ...prev.Details,
                [name]: value,
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const venueId = venue.id; // Assuming venue.id is the ID you need

        dispatch(updateVenue({
            backend,
            venueId,
            updatedTitle: venueData.Title,
            updatedDescription: venueData.Description,
            startDate: venueData.Details.StartDate,
            startTime: parseInt(venueData.Details.StartTime, 10),
            location: venueData.Details.Location,
            endDate: venueData.Details.EndDate,
            endTime: parseInt(venueData.Details.EndTime, 10),
            capacity: parseInt(venueData.capacity, 10),
        }))
        .then(() => {
            setIsModalOpen(false); // Close modal on success
        })
        .catch((err) => {
            console.error("Error in updating venue", err);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="font-semibold">Title</label>
                <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border ">
                    <input
                        type="text"
                        name="Title"
                        value={venueData.Title}
                        onChange={handleInputChange}
                        className="my-3 outline-none w-full bg-transparent"
                        required
                    />
                </div>
            </div>

            <div className="flex flex-col flex-auto gap-1">
                <label className="font-semibold">Description</label>
                <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                    <textarea
                        name="Description"
                        value={venueData.Description}
                        onChange={handleInputChange}
                        className="mt-3 outline-none w-full bg-transparent"
                        rows={5}
                        required
                    ></textarea>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2 flex flex-col flex-auto gap-1">
                    <label className="font-semibold">Start Date</label>
                    <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            ref={startDateRef}
                            className="my-3 outline-none w-full bg-transparent"
                        />
                        <FcCalendar size={24} />
                    </div>
                </div>

                <div className="w-1/2 flex flex-col flex-auto gap-1">
                    <label className="font-semibold">End Date</label>
                    <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            ref={endDateRef}
                            className="my-3 outline-none w-full bg-transparent"
                        />
                        <FcCalendar size={24} />
                    </div>
                </div>
            </div>

            <div className="flex space-x-4">
                <div className="w-1/2 flex flex-col flex-auto gap-1">
                    <label className="font-semibold">Start Time</label>
                    <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            ref={startTimeRef}
                            className="my-3 outline-none w-full bg-transparent"
                        />
                        <FcAlarmClock size={24} />
                    </div>
                </div>
                <div className="w-1/2 flex flex-col flex-auto gap-1">
                    <label className="font-semibold">End Time</label>
                    <div className="flex items-center border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            ref={endTimeRef}
                            className="my-3 outline-none w-full bg-transparent"
                        />
                        <FcAlarmClock size={24} />
                    </div>
                </div>
            </div>

            <div className="flex flex-col flex-auto gap-1">
                <label className="font-semibold">Location</label>
                <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="text"
                        name="Location"
                        value={venueData.Details.Location}
                        onChange={handleDetailsChange}
                        className="my-3 outline-none w-full bg-transparent"
                        required
                    />
                </div>
            </div>
            <div className="flex flex-col flex-auto gap-1">
                <label className="font-semibold">Maximum number of people</label>
                <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="number"
                        name="capacity"
                        value={venueData.capacity}
                        onChange={handleInputChange}
                        className="my-3 outline-none w-full bg-transparent"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                    Update Venue
                </button>
            </div>
        </form >
    );
};

export default UpdateVenueForm;
