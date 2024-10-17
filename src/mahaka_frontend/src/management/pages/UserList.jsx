import Avvvatars from "avvvatars-react";
import React, { useState, useEffect } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export const dummyUserList = [
  {
    name: "Alice Johnson",
    principalId:
      "lkum4-lq5h6-xakur-f2d56-iuiz5-cmqv4-btmqz-y36ma-rhacf-ycxjr-wae",
  },
  {
    name: "A Smith",
    principalId:
      "ajsy2-pt5h9-ykur-f3d45-jiop8-xkqw3-txazr-v78ba-jiuhg-qweru-mnbvc",
  },
  {
    name: "Bob Brown",
    principalId:
      "zabc1-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
  },
  {
    name: "Charlie Brown",
    principalId:
      "mkop3-hq6r7-yztr-d8f56-ryut1-cplw2-kmnoq-z57de-uikhl-txyza-wertq",
  },
  {
    name: "Dana White",
    principalId:
      "pqo9a-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
  },
  {
    name: "Eva Green",
    principalId:
      "rtyu4-nm6d7-pwuv-g9h21-cbml7-oqzi5-dfrt3-e12vn-uopmn-ikjgf-dfghj",
  },
  {
    name: "Avery Lewis",
    principalId:
      "efgh2-pt5h9-ykur-f3d45-jiop8-xkqw3-txazr-v78ba-jiuhg-qweru-mnbvc",
  },
  {
    name: "Ben Foster",
    principalId:
      "ijkl3-hq6r7-yztr-d8f56-ryut1-cplw2-kmnoq-z57de-uikhl-txyza-wertq",
  },
  {
    name: "Catherine Zeta",
    principalId:
      "mnop4-ef2h6-mzaw-k4j78-lotq3-wieq5-puqas-v36bc-hyruq-jklmn-vzxtr",
  },
  {
    name: "Daniel Craig",
    principalId:
      "qrst5-pt5h9-ykur-f3d45-jiop8-xkqw3-txazr-v78ba-jiuhg-qweru-mnbvc",
  },
];

const MgtUserList = () => {
  return (
    <div>
      <UserListMain />
    </div>
  );
};

const UserListIntro = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="flex flex-auto flex-col justify-between border-b px-6 py-8 sm:flex-row md:px-8 bg-card border-border">
      <div>
        <div className="text-4xl font-extrabold leading-none tracking-tight">
          Users
        </div>
        <div className="text-secondary ml-0.5 font-medium">
          {dummyUserList.length} Users
        </div>
      </div>
      <div className="mt-4 flex items-center sm:mt-0 md:mt-4">
        <div className="flex-auto">
          <div className="relative flex items-stretch px-4 border border-border rounded-full">
            <div className="min-h-10 flex items-center">
              <HiOutlineMagnifyingGlass size={20} className="mr-1" />
              <input
                type="text"
                placeholder="Search users"
                className="outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserListMain = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const groupUsersByInitial = (users) => {
    return users.reduce((acc, user) => {
      const initial = user.name.charAt(0).toUpperCase();
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(user);
      return acc;
    }, {});
  };

  const filteredUsers = dummyUserList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedUsers = groupUsersByInitial(filteredUsers);
  const sortedInitials = Object.keys(groupedUsers).sort();

  return (
    <div className="relative">
      <UserListIntro
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {sortedInitials.map((initial) => (
        <div key={initial}>
          <div className="text-secondary sticky top-0 z-10 -mt-px border-b border-t bg-gray-50 px-6 py-1 font-medium uppercase dark:bg-gray-900 md:px-8 border-border">
            {initial}
          </div>
          <div className="">
            {groupedUsers[initial].map((user, index) => (
              <div
                key={index}
                className="z-20 flex cursor-pointer items-center border-b border-b-border px-6 py-4 md:px-8 dark:hover:bg-hover hover:bg-gray-100 bg-card"
              >
                <div className="flex h-10 w-10 flex-0 items-center justify-center overflow-hidden rounded-full">
                  <Avvvatars value={user.name} size={40} shadow={false} />
                </div>
                <div className="ml-4 min-w-0">
                  <div className="truncate font-medium leading-5">
                    {user.name}
                  </div>
                  <div className="truncate leading-5 text-text">
                    {user.principalId}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MgtUserList;
