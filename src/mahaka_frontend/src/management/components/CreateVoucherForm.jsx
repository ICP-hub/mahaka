import React, { useState } from 'react';
import { MdCalendarToday } from 'react-icons/md';

const CreateVoucherForm = ({ setIsModalOpen }) => {
  const [voucher, setVoucher] = useState({
    name: '',
    description: '',
    activeDate: '',
    addEndDate: false,
  });

  const handleCreateVoucher = () => {
    console.log('Creating voucher:', voucher);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Voucher name"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        value={voucher.name}
        onChange={(e) => setVoucher({ ...voucher, name: e.target.value })}
      />
      
      <textarea
        placeholder="Add description"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
        value={voucher.description}
        onChange={(e) => setVoucher({ ...voucher, description: e.target.value })}
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Active dates</label>
        <div className="relative">
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={voucher.activeDate}
            onChange={(e) => setVoucher({ ...voucher, activeDate: e.target.value })}
          />
          <MdCalendarToday className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="addEndDate"
          checked={voucher.addEndDate}
          onChange={(e) => setVoucher({ ...voucher, addEndDate: e.target.checked })}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="addEndDate" className="text-sm font-medium text-gray-700">
          Add end date
        </label>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Voucher icon</label>
        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
            Upload Image
          </button>
          <p className="mt-2 text-sm text-gray-500">JPEG, PNG less than 5MB</p>
        </div>
      </div>
      
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateVoucher}
          className="px-4 py-2 bg-orange-500 text-white rounded-full"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateVoucherForm;