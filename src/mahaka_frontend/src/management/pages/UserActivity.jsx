import React, { useState } from "react";

const MgtUserActivity = () => {
  return (
    <div className="relative flex min-w-0 flex-auto flex-col overflow-hidden">
      <div className="flex flex-auto flex-col px-6 py-10 sm:px-16 sm:pb-20 sm:pt-18">
        <div className="w-full max-w-3xlw-full max-w-3xl">
          <div className="text-4xl font-extrabold leading-none tracking-tight">
            All Activities
          </div>
          <div className="text-icons mt-1.5 text-lg">
            Team member activities are listed here as individual user, starting
            with the most recent.
          </div>
          <div className="mt-8">
            <ol>
              <li className="relative flex">
                <div className="relative rounded-full bg-primary px-8 py-2 text-md font-medium leading-5 text-white">
                  Today
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <h1>user activity page</h1>
    </div>
  );
};

export default MgtUserActivity;
