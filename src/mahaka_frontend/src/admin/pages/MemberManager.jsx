import Avvvatars from "avvvatars-react";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import {
  HiMagnifyingGlass,
  HiMiniShieldCheck,
  HiOutlineEnvelope,
  HiOutlineFlag,
  HiOutlinePencilSquare,
  HiOutlinePlusSmall,
  HiXMark,
} from "react-icons/hi2";
import NavigationRight from "../../common/components/NavigationRight";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserByPrincipal,
  updateUser,
} from "../../redux/reducers/apiReducers/userApiReducer";
import { Principal } from "@dfinity/principal";
import notificationManager from "../../common/utils/notificationManager";

// Permissions
const rolePermissions = {
  admin: ["Create", "Read", "Write", "Edit"],
  staff: ["Create"],
  manager: ["Read"],
  bod: ["Read"],
  supervisor: ["Edit"],
};

const MemberManager = () => {
  const { users, userLoading } = useSelector((state) => state.users);
  const [isRtNavOpen, setIsRtNavOpen] = useState(false);
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

  return (
    <div className="flex flex-auto flex-col">
      <div className="flex min-w-0 overflow-hidden">
        <div className="relative overflow-y-auto overflow-x-hidden flex-auto custom-scroll">
          <div className="flex flex-auto flex-col justify-between border-b px-6 py-8 sm:flex-row md:flex-col md:px-8 bg-card border-b-border">
            <div>
              <div className="text-4xl font-extrabold leading-none tracking-tight">
                Members
              </div>
              <div className="text-secondary ml-0.5 font-medium">
                {userLoading ? (
                  <div className="animate-pulse bg-gray-500 rounded-md h-6 w-16"></div>
                ) : (
                  <div>{users.length} members</div>
                )}
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
          {userLoading ? (
            <div className="p-6 space-y-4">
              {/* Skeleton for each member */}
              {Array(3)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 animate-pulse"
                  >
                    <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                      <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))}
            </div>
          ) : users.length > 0 ? (
            <MemberList
              members={users}
              onMemberClick={openDetailView}
              isRtNavOpen={isRtNavOpen}
            />
          ) : (
            <div className="text-center text-gray-500 md:text-5xl text-3xl font-bold mt-10">No users found</div>
          )}
        </div>
        <NavigationRight isOpen={isRtNavOpen}>
          <UpdateMember
            member={currentMember}
            onToggle={toggleNav}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            members={users}
          />
        </NavigationRight>
      </div>
    </div>
  );
};

const MemberList = ({ members, onMemberClick, isRtNavOpen }) => {
  return (
    <div>
      {members.map((member) => (
        <div
          key={member.id.toText()}
          className="z-20 flex cursor-pointer items-center border-b px-6 py-4 md:px-8 dark:hover:bg-hover hover:bg-gray-100 border-b-border bg-card justify-start"
          onClick={() => {
            if (!isRtNavOpen) onMemberClick(member);
          }}
        >
          <div className="flex h-10 w-10 flex-0 items-center justify-center overflow-hidden rounded-full">
            <Avvvatars value={member.firstName} size={48} shadow={true} />
          </div>
          <div className="ml-4 min-w-0">
            <div className="truncate font-medium leading-5">
              {member.firstName} {member.lastName}
            </div>
            <div className="flex items-center justify-center rounded-full bg-gray-100 px-2 py-0.5 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300 max-w-fit">
              <span className="whitespace-nowrap text-sm font-medium">
                {Object.keys(member.role)[0]}
              </span>
            </div>
          </div>
          <FaArrowRight className="flex items-end ml-auto opacity-90" />
        </div>
      ))}
    </div>
  );
};

const UpdateMember = ({ member, onToggle, isEditing, setIsEditing }) => {
  const [firstName, setFirstName] = useState(member ? member.firstName : "");
  const [lastName, setLastName] = useState(member ? member.lastName : "");
  const [email, setEmail] = useState(member ? member.email : "");
  const [role, setRole] = useState(member ? Object.keys(member.role)[0] : "");
  const [principalId, setPrincipalId] = useState(
    member ? member.id.toText() : ""
  );
  const [selectedVenue, setSelectedVenue] = useState(
    member ? member.assignedVenue : ""
  );
  const { backend } = useSelector((state) => state.authentication);
  const { venues } = useSelector((state) => state.venues);
  const isNewMember = !member;
  const dispatch = useDispatch();

  const handleSubmit = () => {
    // Validation
    const validateField = (value, message, pattern) => {
      if (!value || (pattern && !pattern.test(value))) {
        notificationManager.error(message);
        return false;
      }
      return true;
    };
    if (
      !validateField(firstName.trim(), "First name is required.") ||
      !validateField(lastName.trim(), "Last name is required.") ||
      !validateField(
        email,
        "Invalid email format.",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      ) ||
      !validateField(role, "Role is required.") ||
      !validateField(selectedVenue, "Assigned venue is required.")
    ) {
      return;
    }

    // pass validation
    const userDataForUpdate = {
      firstName: firstName,
      lastName: lastName,
      role: { [role]: null },
      email: email,
      principal: principalId,
      venue: { id: selectedVenue.id, title: selectedVenue.Title },
    };

    dispatch(
      updateUser({
        backend: backend,
        user: userDataForUpdate,
        onToggle: onToggle,
      })
    );
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
                {firstName.charAt(0)}
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
            {member ? (
              <div>
                {member.firstName} {member.lastName}
              </div>
            ) : (
              "New Member"
            )}
          </div>
          <div className="mt-2">
            {isEditing ? (
              <EditDetails
                firstName={firstName}
                lastName={lastName}
                setFirstName={setFirstName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                role={role}
                setRole={setRole}
                selectedVenue={selectedVenue}
                setSelectedVenue={setSelectedVenue}
                principalId={principalId}
                setPrincipalId={setPrincipalId}
                onSubmit={handleSubmit}
                onToggle={onToggle}
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
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  role,
  setRole,
  selectedVenue,
  setSelectedVenue,
  principalId,
  setPrincipalId,
  onSubmit,
  onToggle,
}) => {
  const availableRoles = ["staff", "manager", "supervisor", "bod", "admin"];
  const dispatch = useDispatch();
  const { venues } = useSelector((state) => state.venues);
  const { newLoading, deleteLoading } = useSelector((state) => state.users);
  const { backend } = useSelector((state) => state.authentication);
  const permissions = rolePermissions[role] || [];

  const handleSelectedVenue = (event) => {
    const selectedVenueId = event.target.value;
    const venue = venues.find((venue) => venue.id === selectedVenueId);
    setSelectedVenue(venue);
  };

  const handleDeleteMember = () => {
    dispatch(
      deleteUserByPrincipal({
        backend: backend,
        principal: Principal.fromText(principalId),
        onToggle: onToggle,
      })
    );
  };

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
        <div className="font-medium">First name</div>
        <div className="w-full border border-border flex items-center px-2 sm:px-4 min-h-12 rounded-md focus-within:border-secondary">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter Name"
            className="min-h-12 w-full border-0 bg-transparent px-0 py-2 text-text focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="font-medium">Last name</div>
        <div className="w-full border border-border flex items-center px-2 sm:px-4 min-h-12 rounded-md focus-within:border-secondary">
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <option value="" disabled>
            Select a role
          </option>{" "}
          {availableRoles.map((availableRole) => (
            <option
              key={availableRole}
              value={availableRole}
              className="bg-card text-text capitalize"
            >
              {availableRole}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <div className="font-medium">Assigned Venue*</div>
        <select
          className="w-full border border-border rounded-md px-2 min-h-12 bg-card focus-within:border-secondary"
          value={selectedVenue ? selectedVenue.id : ""}
          onChange={handleSelectedVenue}
        >
          <option value="" disabled>
            Select a venue
          </option>
          {venues.map(({ Title, id }) => (
            <option key={Title} value={id} className="bg-card">
              {Title}
            </option>
          ))}
        </select>
      </div>
      <div className="-mx-6 mt-10 flex items-center border-t bg-gray-50 py-4 pl-1 pr-4 dark:bg-transparent sm:-mx-12 sm:pl-7 sm:pr-12 border-t-border font-medium">
        <button
          onClick={handleDeleteMember}
          disabled={deleteLoading}
          className="text-error px-5 min-w-16 relative inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full min-h-10"
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
        <button
          className="ml-auto px-5 min-w-16 relative inline-flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full min-h-10"
          onClick={() => onToggle(false)}
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          disabled={newLoading}
          className="px-5 min-w-16 relative inline-flex items-center justify-center bg-indigo-600 rounded-full min-h-10 text-white ml-2"
        >
          {newLoading ? "Saving..." : "save"}
        </button>
      </div>
    </div>
  );
};

const ViewDetails = ({ member, venues }) => {
  if (!member) return null;
  const permissions = rolePermissions[Object.keys(member.role)[0]] || [];

  // const venueTitle = venues.map(({ id, Title }) => {
  //   if (id === member.assignedVenue) {
  //     return Title;
  //   }
  // });

  return (
    <div>
      <div className="mt-2 flex flex-wrap items-center">
        <div className="mb-3 mr-3 flex items-center justify-center rounded-full bg-gray-100 px-3 py-1 leading-normal text-gray-500 dark:bg-gray-700 dark:text-gray-300">
          <span className="whitespace-nowrap text-sm font-medium">
            {Object.keys(member.role)[0]}
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
          <div className="ml-6 leading-6">{member.id.toText()}</div>
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
            <div className="flex items-center leading-6 cursor-pointer">
              <div>{member.assignedVenue.title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberManager;
