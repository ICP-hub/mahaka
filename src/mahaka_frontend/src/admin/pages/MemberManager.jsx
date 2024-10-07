import React, { useState } from "react";
import { MdPerson, MdAddCircleOutline, MdDelete } from "react-icons/md";
import ProfileDummy from "@/assets/images/profile-demo.png";
import { CiEdit } from "react-icons/ci";
import ModalOverlay from "../../customer/Components/Modal-overlay"; // Import the modal
import { motion, AnimatePresence } from "framer-motion";

const MemberManager = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Aarav Sharma",
      email: "aaravsharma@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Aditya Kapoor",
      email: "adityakapoor@gmail.com",
      role: "Read",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    principalId: "",
    role: "Admin",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const handleAddOrEditMember = () => {
    if (newMember.email && newMember.name && newMember.principalId) {
      if (isEditMode && editingMember) {
        // Edit mode: update member
        setMembers(
          members.map((member) =>
            member.id === editingMember.id ? { ...editingMember, ...newMember } : member
          )
        );
      } else {
        // Add mode: add new member
        setMembers([
          ...members,
          {
            id: members.length + 1,
            name: newMember.name,
            email: newMember.email,
            role: newMember.role,
          },
        ]);
      }

      // Close modal and reset state
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingMember(null);
      setNewMember({ name: "", email: "", principalId: "", role: "Read" });
    }
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-orange-500";
      case "Write":
        return "bg-green-500";
      case "Read":
        return "bg-blue-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Team</h2>
      <div className="mb-4">
        {/* <h3 className="text-lg font-semibold mb-2">Add team members</h3> */}
        <div className="flex items-center">
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setNewMember({ name: "", email: "", principalId: "", role: "Admin" });
            }}
            className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 focus:outline-none flex items-center"
          >
            <MdAddCircleOutline size={24} className="mr-2" />
            Add Member
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        {members.map((member, index) => (
          <div
            className="flex flex-col py-6 sm:flex-row sm:items-center bg-card px-4 md:px-6 rounded"
            key={index}
          >
            <div className="flex items-center">
              <div className="flex h-10 w-10 flex-0 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={ProfileDummy}
                  alt="user_avatar"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4">
                <div className="font-medium">{member.name}</div>
                <div>{member.email}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center sm:ml-auto sm:mt-0">
              <div
                className={`order-2 ml-4 sm:order-1 sm:ml-0 flex space-x-1 px-4 py-2 rounded-full text-white ${getRoleColor(
                  member.role
                )}`}
              >
                <p>{member.role}</p>
              </div>
              <div className="order-1 sm:order-2 sm:ml-3">
                <CiEdit
                  size={24}
                  onClick={() => {
                    setIsEditMode(true);
                    setEditingMember(member);
                    setNewMember(member); 
                    setIsModalOpen(true);
                  }}
                />
              </div>
            </div>
            <button
              onClick={() => handleDeleteMember(member.id)}
              className="text-red-500 ml-4"
            >
              <MdDelete size={24} />
            </button>
          </div>
        ))}
      </div>

      {/* Modal for adding or editing member */}
      <ModalOverlay
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        title={isEditMode ? "Edit Member" : "Add New Member"}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-medium ">
              Name
            </label>
          <div className="border border-border rounded-lg px-4 focus-within:border-indigo-600 dark:focus-within:border-border ">
            <input
              type="text"
              value={newMember.name}
              onChange={(e) =>
                setNewMember({ ...newMember, name: e.target.value })
              }
              className="my-3 outline-none w-full bg-transparent"
              placeholder="Enter member's name"
              required
            />
          </div>
          </div>
          <div>
            <label className="block font-medium ">
              Email
            </label>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="email"
              value={newMember.email}
              onChange={(e) =>
                setNewMember({ ...newMember, email: e.target.value })
              }
              className="mt-3 mb-3 outline-none w-full bg-transparent"
              placeholder="Enter email address"
              required
            />
          </div>
          </div>
          <div>
            <label className="block  font-medium ">
              Principal ID
            </label>
          <div className="border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <input
              type="text"
              value={newMember.principalId}
              onChange={(e) =>
                setNewMember({ ...newMember, principalId: e.target.value })
              }
              className="mt-3 mb-3 outline-none w-full bg-transparent"
              placeholder="Enter principal ID"
              required
            />
          </div>
          </div>
          <div>
            <label className="block  font-medium ">
              Role
            </label>
          <div className="bg-transparent border border-border rounded-lg pl-4 focus-within:border-indigo-600 dark:focus-within:border-border">
            <select
              value={newMember.role}
              onChange={(e) =>
                setNewMember({ ...newMember, role: e.target.value })
              }
              className="mt-3 mb-3 outline-none w-full bg-transparent"
            >
              <option className="mt-3 mb-3 outline-none w-full bg-transparent" value="Admin">Admin</option>
              <option className="mt-3 mb-3 outline-none w-full bg-transparent" value="Write">Write</option>
              <option className="mt-3 mb-3 outline-none w-full bg-transparent" value="Read">Read</option>
            </select>
          </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddOrEditMember}
              className=" py-2 px-4 bg-orange-500  py-2 rounded-md hover:bg-orange-700"
            >
              {isEditMode ? "Save Changes" : "Add Member"}
            </button>
          </div>
        </div>
      </ModalOverlay>
    </div>
  );
};

export default MemberManager;
