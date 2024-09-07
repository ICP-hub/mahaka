import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../redux/reducers/apiReducers/eventApiReducer";

const CreateEventForm = () => {
    const dispatch = useDispatch();
    const { backend } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.events);
    const [eventData, setEventData] = useState({
        title: '',
        collection_args: {
            description: '',
            maxLimit: 1000,
            logo: {
                data: '',
                logo_type: '',
            },
            name: '',
            banner: {
                data: '',
                logo_type: '',
            },
            created_at: 0,
            collection_type: { Event: null },
            symbol: '',
        },
        eventDetails: {
            StartDate: '',
            StartTime: '',
            EndDate: '',
            EndTime: '',
            Location: '',
        },
        sTicket_limit: 0,
        gTicket_limit: 0,
        vTicket_limit: 0,
    });



    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Check if the field belongs to collection_args
        if (name === "description" || name === "maxLimit" || name === "symbol" || name === "name") {
            setEventData((prevState) => ({
                ...prevState,
                collection_args: {
                    ...prevState.collection_args,
                    [name]: value,
                },
            }));
        } else {
            setEventData((prevState) => ({
                ...prevState,
                [name]: name.includes("Ticket_limit") && value !== '' ? parseInt(value) : value,
            }));
        }
    };



    const handleNestedInputChange = (e, field) => {
        const { value } = e.target;
        setEventData((prevState) => ({
            ...prevState,
            eventDetails: {
                ...prevState.eventDetails,
                [field]: value,
            },
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            const reader = new FileReader();
            reader.onloadend = () => {
                setEventData((prevState) => ({
                    ...prevState,
                    collection_args: {
                        ...prevState.collection_args,
                        banner: {
                            data: reader.result,
                            logo_type: fileType,
                        },
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        // Dispatch the createEvent action
        dispatch(createEvent({
            backend,
            text: 'title of the venue#br5f7-7uaaa-aaaaa-qaaca-cai',
            record: {
                id: "br5f7-7uaaa-aaaaa-qaaca-cai",
                Description: eventData.collection_args.description,
                sTicket_limit: eventData.sTicket_limit,
                gTicket_limit: eventData.gTicket_limit,
                vTicket_limit: eventData.vTicket_limit,
                Details: {
                    StartDate: eventData.eventDetails.StartDate,
                    StartTime: eventData.eventDetails.StartTime ? parseInt(eventData.eventDetails.StartTime) : 0,
                    Location: eventData.eventDetails.Location,
                    EndDate: eventData.eventDetails.EndDate,
                    EndTime: eventData.eventDetails.EndTime ? parseInt(eventData.eventDetails.EndTime) : 0,
                },
                Title: eventData.title,
            },
            collection_args: {
                collection_args: {
                    maxLimit: eventData.collection_args.maxLimit,
                    logo: eventData.collection_args.logo,
                    name: eventData.collection_args.name,
                    banner: eventData.collection_args.banner,
                    description: eventData.collection_args.description,
                    created_at: Date.now(),
                    collection_type: { Event: null },
                    symbol: eventData.collection_args.symbol,
                }
            }
        }));
    };



    return (
        <form onSubmit={handleSubmit} className="space-y-4 tracking-wider">
            {/* Event Title */}
            <div>
                <label className="font-semibold">Event Title</label>
                <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="text"
                        name="title"
                        value={eventData.title}
                        onChange={handleInputChange}
                        className="mt-1 p-2 outline-none w-full bg-transparent"
                        placeholder="Event title"
                        required
                    />
                </div>
            </div>

            {/* Event Description */}
            <div>
                <label className="font-semibold">Event Description</label>
                <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                    <textarea
                        name="description"
                        value={eventData.collection_args.description}
                        onChange={handleInputChange}
                        className="mt-1 p-2 outline-none w-full bg-transparent"
                        placeholder="Event description"
                        required
                    />
                </div>
            </div>

            {/* Event Date */}
            <div>
                <label className="font-semibold">Start Date</label>
                <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="date"
                        name="StartDate"
                        value={eventData.eventDetails.StartDate}
                        onChange={(e) => handleNestedInputChange(e, "StartDate")}
                        className="mt-1 p-2 outline-none w-full bg-transparent"
                        required
                    />
                </div>
            </div>

            {/* Event End Date */}
            <div>
                <label className="font-semibold">End Date</label>
                <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="date"
                        name="EndDate"
                        value={eventData.eventDetails.EndDate}
                        onChange={(e) => handleNestedInputChange(e, "EndDate")}
                        className="mt-1 p-2 outline-none w-full bg-transparent"
                        required
                    />
                </div>
            </div>

            {/* Event Time */}
            <div className="flex space-x-4">
                <div className="w-1/2">
                    <label className="font-semibold">Starting Time</label>
                    <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="time"
                            name="StartTime"
                            value={eventData.eventDetails.StartTime}
                            onChange={(e) => handleNestedInputChange(e, "StartTime")}
                            className="mt-1 p-2 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <label className="font-semibold">Ending Time</label>
                    <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="time"
                            name="EndTime"
                            value={eventData.eventDetails.EndTime}
                            onChange={(e) => handleNestedInputChange(e, "EndTime")}
                            className="mt-1 p-2 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Location */}
            <div>
                <label className="font-semibold">Location</label>
                <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                    <input
                        type="text"
                        name="Location"
                        value={eventData.eventDetails.Location}
                        onChange={(e) => handleNestedInputChange(e, "Location")}
                        className="mt-1 p-2 outline-none w-full bg-transparent"
                        placeholder="Event location"
                        required
                    />
                </div>
            </div>

            {/* Ticket Limits */}
            <div className="flex space-x-4">
                <div className="w-1/3">
                    <label className="font-semibold">General Ticket Limit</label>
                    <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="gTicket_limit"
                            value={eventData.gTicket_limit}
                            onChange={handleInputChange}
                            className="mt-1 p-2 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="font-semibold">Student Ticket Limit</label>
                    <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="sTicket_limit"
                            value={eventData.sTicket_limit}
                            onChange={handleInputChange}
                            className="mt-1 p-2 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <label className="font-semibold">VIP Ticket Limit</label>
                    <div className="border border-border rounded focus-within:border-indigo-600 dark:focus-within:border-border">
                        <input
                            type="number"
                            name="vTicket_limit"
                            value={eventData.vTicket_limit}
                            onChange={handleInputChange}
                            className="mt-1 p-2 outline-none w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
            </div>

            {/* Event Image */}
            <div>
                <label className="font-semibold">Event Image</label>
                <div className="mt-1 flex flex-col items-center justify-center border-dashed border-2 border-border p-4 rounded">
                    <input
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="hidden"
                        id="upload-image"
                    />
                    <label
                        htmlFor="upload-image"
                        className="cursor-pointer bg-card text-text py-2 px-4 rounded-md border border-border"
                    >
                        Upload Image
                    </label>
                    <p className="text-sm text-gray-500 mt-2">JPEG, PNG less than 5MB</p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <button
                    type="submit"
                    className={`text-white py-2 px-4 rounded ${loading ? "bg-gray-400" : "bg-secondary"
                        }`}
                    onClick={loading ? null : handleSubmit}
                >
                    {loading ? 'Creating Event...' : 'Create Event'}
                </button>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-center">{error}</div>}

        </form>
    );
};

export default CreateEventForm;
