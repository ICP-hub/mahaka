import React, { useState } from "react";
import { MdPerson, MdAddCircleOutline, MdDelete } from "react-icons/md";
import ProfileDummy from "@/assets/images/profile-demo.png";
import { CiEdit } from "react-icons/ci";

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
      role: "Admin",
    },
  ]);

  const [newMemberEmail, setNewMemberEmail] = useState("");

  const handleAddMember = () => {
    if (newMemberEmail) {
      setMembers([
        ...members,
        {
          id: members.length + 1,
          name: "New Member",
          email: newMemberEmail,
          role: "Read",
        },
      ]);
      setNewMemberEmail("");
    }
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-bold mb-4">Team</h2>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add team members</h3>
        <div className="flex items-center">
          <input
            type="email"
            value={newMemberEmail}
            onChange={(e) => setNewMemberEmail(e.target.value)}
            placeholder="Enter email address"
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleAddMember}
            className="bg-orange-500 text-white p-3 rounded-r-md hover:bg-orange-800 focus:outline-none"
          >
            <MdAddCircleOutline size={24} />
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
              <div className="order-2 ml-4 sm:order-1 sm:ml-0 flex space-x-1 px-4 py-2 bg-secondary rounded text-white">
                <span>Role :</span>
                <p>{member.role}</p>
              </div>
              <div className="order-1 sm:order-2 sm:ml-3">
                <CiEdit size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <ul>
        {members.map((member) => (
          <li key={member.id} className="flex bg-card text-text items-center justify-between py-2 m-3 border-b border-gray-300">
            <div className="flex items-center">
              <MdPerson
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-gray-500">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center">
                
              <select
                defaultValue={member.role}
                className="mr-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              > 
                <option>Role: Admin</option>
                <option>Role: Write</option>
                <option>Role: Read</option>
              </select>
              <button
                onClick={() => handleDeleteMember(member.id)}
                className="text-red-500"
              >
                <MdDelete size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default MemberManager;
