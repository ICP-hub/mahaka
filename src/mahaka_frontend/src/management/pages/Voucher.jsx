import React, { useState } from "react";
import { MdCardGiftcard, MdVpnKey, MdSearch, MdChevronRight } from "react-icons/md";
import ModalOverlay from "../../customer/Components/Modal-overlay";
import CreateVoucherForm from "../components/CreateVoucherForm";

const vouchersInitial = [
    { id: 1, title: 'Free Souvenir for All Tickets', description: 'Experience the spirit of our aquatic world...', startDate: '20 October 24', endDate: '1 November 24', time: 'All day', status: 'Active', icon: <MdCardGiftcard size={24} className="text-teal-500" /> },
    { id: 2, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry...', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 3, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: 'All day', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 4, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 5, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 6, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '-', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 7, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 8, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 9, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 10, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 11, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 12, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '-', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 13, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 14, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 15, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 16, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 17, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 18, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Active', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 19, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
    { id: 20, title: 'VIP Area Access for VIP Pass Holders', description: 'VIP Pass holders receive exclusive entry to the premium VIP area with enhanced amenities.', startDate: '29 July 24', endDate: '1 August 24', time: '10:00 AM - 5:00 PM', status: 'Expired', icon: <MdVpnKey size={24} className="text-teal-500" /> },
];

const VOUCHERS_PER_PAGE = 8;

function MgtVoucher() {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [vouchers, setVouchers] = useState(vouchersInitial);
    const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const vouchersPerPage = 8;

    const filteredVouchers = vouchers.filter(voucher => {
        if (filter === 'Active') return voucher.status === 'Active';
        if (filter === 'Expired') return voucher.status === 'Expired';
        return true;
    }).filter(voucher =>
        voucher.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastVoucher = currentPage * vouchersPerPage;
    const indexOfFirstVoucher = indexOfLastVoucher - vouchersPerPage;
    const currentVouchers = filteredVouchers.slice(indexOfFirstVoucher, indexOfLastVoucher);
    const totalPages = Math.ceil(filteredVouchers.length / vouchersPerPage);

    return (
        <div className="min-h-screen p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold">Mahaka </h1>
                    <button
                        className="px-5 min-w-5 py-1 sm:px-6 sm:py-2 text-white bg-orange-400 rounded-md hover:bg-orange-500"
                        onClick={() => setIsVoucherModalOpen(true)}
                    >
                        Create Voucher
                    </button>
                </div>

                <div className="bg-card rounded-lg shadow-md p-6">
                    {/* Filter Section */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex space-x-8">
                            {['All', 'Active', 'Expired'].map(option => (
                                <button
                                    key={option}
                                    className={`${filter === option ? 'text-teal-500 border-b-2 border-teal-500 font-semibold' : ''} pb-2 hover:text-teal-500`}
                                    onClick={() => setFilter(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>

                        {/* Search Section */}
                        <div className="relative w-full max-w-sm bg-card">
                            <input
                                type="text"
                                placeholder="Search voucher"
                                className="w-full pl-10 pr-4 py-2 border rounded-md text-sm bg-card"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    {/* Voucher Table */}
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left pb-2 font-semibold"></th>
                                <th className="text-left pb-2 font-semibold">Voucher Name</th>
                                <th className="text-left pb-2 font-semibold">Starting Date</th>
                                <th className="text-left pb-2 font-semibold">Ending Date</th>
                                <th className="text-left pb-2 font-semibold">Time</th>
                                <th className="text-left pb-2 font-semibold">Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentVouchers.map(voucher => (
                                <tr key={voucher.id} className="border-b border-gray-200 last:border-b-0">
                                    <td className="py-4 flex items-center">
                                        {voucher.icon}
                                    </td>
                                    <td>
                                        <span className="ml-2">{voucher.title}</span>
                                    </td>
                                    <td>{voucher.startDate}</td>
                                    <td>{voucher.endDate}</td>
                                    <td>{voucher.time}</td>
                                    <td>
                                        <span
                                            style={{
                                                backgroundColor: voucher.status === 'Active' ? '#28a74520' : '#dc354520',
                                                color: voucher.status === 'Active' ? '#28a745' : '#dc3545',
                                                border: `1px solid ${voucher.status === 'Active' ? '#28a745' : '#dc3545'}`,
                                            }}
                                            className="px-2 py-1 rounded"
                                        >
                                            {voucher.status}
                                        </span>
                                    </td>
                                    <td>
                                        <MdChevronRight size={20} className="text-gray-400" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-end mt-6">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {isVoucherModalOpen && (
                <ModalOverlay
                    isOpen={isVoucherModalOpen}
                    setIsOpen={setIsVoucherModalOpen}
                    title="Create Voucher"
                >
                    <CreateVoucherForm setIsModalOpen={setIsVoucherModalOpen} />
                </ModalOverlay>
            )}
        </div>
    );
}

export default MgtVoucher;