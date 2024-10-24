import Avvvatars from "avvvatars-react";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  HiMagnifyingGlass,
  HiMiniShieldCheck,
  HiMiniSignal,
  HiOutlineEnvelope,
  HiOutlineFlag,
  HiOutlinePencilSquare,
  HiOutlinePlusSmall,
  HiXMark,
} from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import NavigationRight from "../../common/components/NavigationRight";
import { useSelector, useDispatch } from "react-redux";
import { getAllVenues } from "../../redux/reducers/apiReducers/venueApiReducer";
import { updateUser } from "../../redux/reducers/apiReducers/userApiReducer";

const teamData = [
  {
    id: 3,
    name: "Meera Iyer",
    email: "meera.iyer@gmail.com",
    role: "Supervisor",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assigned venue one", "Assigned venue two"],
  },
  {
    id: 4,
    name: "Ravi Singh",
    email: "ravi.singh@gmail.com",
    role: "Manager",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assigned venue one", "Assigned venue two"],
  },
  {
    id: 5,
    name: "Neha Gupta",
    email: "neha.gupta@gmail.com",
    role: "Staff",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assigned venue one", "Assigned venue two"],
  },
  {
    id: 6,
    name: "Karan Verma",
    email: "karan.verma@gmail.com",
    role: "BOD",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assigned venue one", "Assigned venue two"],
  },
  {
    id: 7,
    name: "Pooja Mehta",
    email: "pooja.mehta@gmail.com",
    role: "Supervisor",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
  {
    id: 8,
    name: "Siddharth Jain",
    email: "siddharth.jain@gmail.com",
    role: "Manager",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
  {
    id: 9,
    name: "Tanvi Bansal",
    email: "tanvi.bansal@gmail.com",
    role: "Staff",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
  {
    id: 10,
    name: "Vikram Rao",
    email: "vikram.rao@gmail.com",
    role: "Admin",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
  {
    id: 11,
    name: "Shreya Nair",
    email: "shreya.nair@gmail.com",
    role: "BOD",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
  {
    id: 12,
    name: "Ankit Sethi",
    email: "ankit.sethi@gmail.com",
    role: "Staff",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
    assignedVenues: ["Assgned venue one", "Assgned venue two"],
  },
];

// Permissions
const rolePermissions = {
  Admin: ["Create", "Read", "Write", "Edit"],
  Staff: ["Create"],
  Manager: ["Read"],
  BOD: ["Read"],
  Supervisor: ["Edit"],
};

const MemberManager = () => {
  const { venues } = useSelector((state) => state.venues);
  const [isRtNavOpen, setIsRtNavOpen] = useState(false);
  const [members, setMembers] = useState(teamData);
  const [currentMember, setCurrentMember] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const toggleNav = (isOpen) => {
    setIsRtNavOpen(isOpen);
  };

  const openDetailView = (member) => {
    setCurrentMember(member);
    setIsEditing(false);
    toggleNav(true);
  };

  const deleteMember = (id) => {
    setMembers(members.filter((member) => member.id !== id));
    setCurrentMember(null);
    toggleNav(false);
  };

  return (
    <div className="flex flex-auto flex-col">
      <div className="relative flex flex-auto">
        <div className="absolute inset-0 flex min-w-0 overflow-hidden">
          <div className="relative overflow-y-auto overflow-x-hidden flex-auto custom-scroll">
            <div className="flex flex-auto flex-col justify-between border-b px-6 py-8 sm:flex-row md:flex-col md:px-8 bg-card border-b-border">
              <div>
                <div className="text-4xl font-extrabold leading-none tracking-tight">
                  Members
                </div>
                <div className="text-secondary ml-0.5 font-medium">
                  {members.length} members
                </div>
              </div>
              <div className="mt-4 flex items-center sm:mt-0 md:mt-4">
                <div className="flex-auto flex items-center">
                  <div className="flex flex-auto">
                    <div className="relative px-4 rounded-full border border-border min-h-10 flex items-center w-full">
                      <HiMagnifyingGlass size={20} className="mr-1" />
                      <input
                        type="text"
                        className="outline-none bg-transparent w-full"
                        placeholder="Search members"
                      />
                    </div>
                  </div>
                  <button
                    className="ml-4 px-4 items-center flex bg-secondary text-white min-h-10 rounded-full"
                    onClick={() => {
                      if (!isRtNavOpen) {
                        setCurrentMember(null);
                        setIsEditing(false);
                        toggleNav(true);
                      }
                    }}
                  >
                    <HiOutlinePlusSmall size={20} /> Add
                  </button>
                </div>
              </div>
            </div>
            <MemberList
              members={members}
              onMemberClick={openDetailView}
              isRtNavOpen={isRtNavOpen}
            />
          </div>
          <NavigationRight isOpen={isRtNavOpen}>
            <UpdateMember
              member={currentMember}
              onToggle={toggleNav}
              onDelete={deleteMember}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              members={members}
              setMembers={setMembers}
            />
          </NavigationRight>
        </div>
      </div>
    </div>
  );
};

const MemberList = ({ members, onMemberClick, isRtNavOpen }) => {
  return (
    <div>
      {members.map((member) => (
        <div
          key={member.id}
          className="z-20 flex cursor-pointer items-center border-b px-6 py-4 md:px-8 dark:hover:bg-hover hover:bg-gray-100 border-b-border bg-card justify-start"
          onClick={() => {
            if (!isRtNavOpen) onMemberClick(member);
          }}
        >
          <div className="flex h-10 w-10 flex-0 items-center justify-center overflow-hidden rounded-full">
            <Avvvatars value={member.name} size={48} shadow={true} />
          </div>
          <div className="ml-4 min-w-0">
            <div className="truncate font-medium leading-5">{member.name}</div>
            <div className="flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300 max-w-fit">
              <span className="whitespace-nowrap text-sm font-medium">
                {member.role}
              </span>
            </div>
          </div>
          <FaArrowRight className="flex items-end ml-auto opacity-90" />
        </div>
      ))}
    </div>
  );
};

const UpdateMember = ({
  member,
  onToggle,
  onDelete,
  isEditing,
  setIsEditing,
  members,
  setMembers,
}) => {
  const [name, setName] = useState(member ? member.name : "");
  const [email, setEmail] = useState(member ? member.email : "");
  const [role, setRole] = useState(member ? member.role : "");
  const [principalId, setPrincipalId] = useState(
    member ? member.principalId : ""
  );
  const { backend } = useSelector((state) => state.authentication);
  const { venues } = useSelector((state) => state.venues);
  const isNewMember = !member;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Create user object from form data
    const user = {
      firstName: name,
      lastName: "user name",
      email: email,
      role: { manager: null },
      principal: principalId,
    };

    // Dispatch the updateUser action with necessary arguments
    dispatch(updateUser({ backend, user }));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-20 w-full bg-accent-100 px-8 dark:bg-accent-700 sm:h-28 sm:px-12">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-end pt-6">
          <button
            className="cursor-pointer hover:bg-hover p-2 rounded-full z-30"
            onClick={() => onToggle(false)}
          >
            <HiXMark size={24} />
          </button>
        </div>
      </div>
      <div className="relative flex flex-auto flex-col items-center px-6 sm:px-12">
        <div className="w-full max-w-3xl">
          <div className="-mt-16 flex flex-auto items-end">
            <div className="ring-bg-card flex h-32 w-32 items-center justify-center overflow-hidden rounded-full ring-4">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded bg-gray-200 text-8xl font-bold uppercase leading-none text-gray-600 dark:bg-gray-700 dark:text-gray-200">
                {name.charAt(0)}
              </div>
            </div>
            <div
              className="mb-1 ml-auto flex items-center cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              <div className="flex items-center px-4 py-2 rounded-full border border-border justify-center font-medium hover:bg-hover">
                <HiOutlinePencilSquare size={24} className="mr-2" />
                {isNewMember ? "Add Member" : "Edit"}
              </div>
            </div>
          </div>
          <div className="mt-3 truncate text-4xl font-bold">
            {member ? member.name : "New Member"}
          </div>
          <div className="mt-2">
            {isEditing ? (
              <EditDetails
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                role={role}
                setRole={setRole}
                principalId={principalId}
                setPrincipalId={setPrincipalId}
                onSubmit={handleSubmit}
                onDelete={() => onDelete(member.id)}
                venues={venues}
              />
            ) : (
              <ViewDetails member={member} venues={venues} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EditDetails = ({
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
  principalId,
  setPrincipalId,
  onSubmit,
  onDelete,
  venues,
}) => {
  const availableRoles = ["Staff", "manager", "Supervisor", "BOD", "Admin"];
  const { venues } = useSelector((state) => state.venues);

  const availableVenues = venues.map((venue) => venue.Title);

  const permissions = rolePermissions[role] || [];

  return (
    <div>
      <div>
        <div className="font-medium">Principal ID</div>
        <div className="w-full border border-border flex items-center px-2 sm:px-4 min-h-12 rounded-md focus-within:border-secondary">
          <input
            type="text"
            value={principalId}
            onChange={(e) => setPrincipalId(e.target.value)}
            placeholder="Enter Principal ID"
            className="min-h-12 w-full border-0 bg-transparent px-0 py-2 text-text focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium">Name</div>
        <div className="w-full border border-border flex items-center px-2 sm:px-4 min-h-12 rounded-md focus-within:border-secondary">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
            className="min-h-12 w-full border-0 bg-transparent px-0 py-2 text-text focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium">Email</div>
        <div className="w-full border border-border flex items-center px-2 sm:px-4 min-h-12 rounded-md focus-within:border-secondary">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="min-h-12 w-full border-0 bg-transparent px-0 py-2 text-text focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium flex items-center w-full mb-2">
          Role*
          {role && (
            <div className="ml-4 flex items-center space-x-4">
              {permissions.length > 0
                ? permissions.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center justify-center rounded-full bg-gray-100 px-3 py-0.5 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                    >
                      <span className="whitespace-nowrap text-sm font-medium">
                        {permission}
                      </span>
                    </div>
                  ))
                : null}
            </div>
          )}
        </div>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-border rounded-md px-2 min-h-12 bg-card focus-within:border-secondary"
        >
          {availableRoles.map((availableRole) => (
            <option
              key={availableRole}
              value={availableRole}
              className="bg-card text-text"
            >
              {availableRole}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <div className="font-medium">Assigned Venue*</div>
        <select className="w-full border border-border rounded-md px-2 min-h-12 bg-card focus-within:border-secondary">
          {availableVenues.map((venue) => (
            <option key={venue} value={venue} className="bg-card">
              {venue}
            </option>
          ))}
        </select>
      </div>
      <div className="-mx-6 mt-10 flex items-center border-t bg-gray-50 py-4 pl-1 pr-4 dark:bg-transparent sm:-mx-12 sm:pl-7 sm:pr-12 border-t-border font-medium">
        <button
          onClick={onDelete}
          className="text-error px-5 min-w-16 relative inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full min-h-10"
        >
          Delete
        </button>
        <button
          onClick={onDelete}
          className="ml-auto px-5 min-w-16 relative inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full min-h-10"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-5 min-w-16 relative inline-flex items-center justify-center bg-indigo-600 rounded-full min-h-10 text-white ml-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

const ViewDetails = ({ member, venues }) => {
  if (!member) return null;

  const permissions = rolePermissions[member.role] || [];

  return (
    <div>
      <div className="mt-2 flex flex-wrap items-center">
        <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300">
          <span className="whitespace-nowrap text-sm font-medium">
            {member.role}
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div>Permissions :</div>
        {permissions.map((permission) => (
          <div
            key={permission}
            className="flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300"
          >
            <span className="whitespace-nowrap text-sm font-medium">
              {permission}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col space-y-8 border-t pt-6 border-t-border">
        <div className="flex items-center">
          <HiMiniShieldCheck size={24} />
          <div className="ml-6 leading-6">{member.principalId}</div>
        </div>
        <div className="flex items-center">
          <HiOutlineEnvelope size={24} />
          <div className="ml-6 leading-6 text-indigo-500 hover:underline cursor-pointer">
            {member.email}
          </div>
        </div>
        <div className="flex">
          <HiOutlineFlag size={24} />
          <div className="ml-6 min-w-0 space-y-1">
            {member.assignedVenues.map((v, index) => (
              <div
                key={index}
                className="flex items-center leading-6 cursor-pointer"
              >
                <div>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [newMember, setNewMember] = useState({
//   name: "",
//   email: "",
//   principalId: "",
//   role: "Admin",
// });

// const [isEditMode, setIsEditMode] = useState(false);
// const [editingMember, setEditingMember] = useState(null);

// const handleAddOrEditMember = () => {
//   if (newMember.email && newMember.name && newMember.principalId) {
//     if (isEditMode && editingMember) {
//       // Edit mode: update member
//       setMembers(
//         members.map((member) =>
//           member.id === editingMember.id
//             ? { ...editingMember, ...newMember }
//             : member
//         )
//       );
//     } else {
//       // Add mode: add new member
//       setMembers([
//         ...members,
//         {
//           id: members.length + 1,
//           name: newMember.name,
//           email: newMember.email,
//           role: newMember.role,
//         },
//       ]);
//     }

//     // Close modal and reset state
//     setIsModalOpen(false);
//     setIsEditMode(false);
//     setEditingMember(null);
//     setNewMember({ name: "", email: "", principalId: "", role: "Read" });
//   }
// };

// const handleDeleteMember = (id) => {
//   setMembers(members.filter((member) => member.id !== id));
// };

// const getRoleColor = (role) => {
//   switch (role) {
//     case "Admin":
//       return "bg-orange-500";
//     case "Write":
//       return "bg-green-500";
//     case "Read":
//       return "bg-blue-600";
//     default:
//       return "bg-gray-500";
//   }
// };

// return (
//   <div className="p-6">
//     <h2 className="text-2xl font-bold mb-4">Teams</h2>
//     <div className="mb-4">
//       {/* <h3 className="text-lg font-semibold mb-2">Add team members</h3> */}
//       <div className="flex items-center">
//         <button
//           onClick={() => {
//             setIsModalOpen(true);
//             setIsEditMode(false);
//             setNewMember({
//               name: "",
//               email: "",
//               principalId: "",
//               role: "Admin",
//             });
//           }}
//           className="bg-orange-500 text-white p-3 rounded-md hover:bg-orange-600 focus:outline-none flex items-center"
//         >
//           <MdAddCircleOutline size={24} className="mr-2" />
//           Add Member
//         </button>
//       </div>
//     </div>
//     <div className="flex flex-col space-y-2">
//       {members.map((member, index) => (
//         <div
//           className="flex flex-col py-6 sm:flex-row sm:items-center bg-card px-4 md:px-6 rounded"
//           key={index}
//         >
//           <div className="flex items-center">
//             <div className="flex h-10 w-10 flex-0 items-center justify-center overflow-hidden rounded-full">
//               <img
//                 src={ProfileDummy}
//                 alt="user_avatar"
//                 className="h-full w-full object-cover"
//               />
//             </div>
//             <div className="ml-4">
//               <div className="font-medium">{member.name}</div>
//               <div>{member.email}</div>
//             </div>
//           </div>
//           <div className="mt-4 flex items-center sm:ml-auto sm:mt-0">
//             <div className="order-2 ml-4 sm:order-1 sm:ml-0 flex space-x-1 px-4 py-2 bg-secondary rounded text-white">
//               <span>Role :</span>
//               <p>{member.role}</p>
//             </div>
//             <div className="order-1 sm:order-2 sm:ml-3">
//               <CiEdit size={24} />
//             </div>
//           </div>
//           <button
//             onClick={() => handleDeleteMember(member.id)}
//             className="text-red-500 ml-4"
//           >
//             <ButtonWrapper color=" hover:text-red-400">
//               <MdDelete size={24} />
//             </ButtonWrapper>
//           </button>
//         </div>
//       ))}
//     </div>
//     {/* <ul>
//       {members.map((member) => (
//         <li key={member.id} className="flex bg-card text-text items-center justify-between py-2 m-3 border-b border-gray-300">
//           <div className="flex items-center">
//             <MdPerson
//               className="w-10 h-10 rounded-full mr-3"
//             />
//             <div>
//               <p className="font-semibold">{member.name}</p>
//               <p className="text-sm text-gray-500">{member.email}</p>
//             </div>
//           </div>
//           <div className="flex items-center">

//             <select
//               defaultValue={member.role}
//               className="mr-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
//             >
//               <option>Role: Admin</option>
//               <option>Role: Write</option>
//               <option>Role: Read</option>
//             </select>
//             <button
//               onClick={() => handleDeleteMember(member.id)}
//               className="text-red-500"
//             >
//               <MdDelete size={20} />
//             </button>
//           </div>
//         </li>
//       ))}
//     </ul> */}
//   </div>
// };

export default MemberManager;
