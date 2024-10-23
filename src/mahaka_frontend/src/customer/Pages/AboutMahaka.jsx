import React from "react";
import about from "../../assets/images/about.png";

const About = () => {
  return (
    <div className="flex min-w-0 flex-auto flex-col">
      <div className="bg-card flex flex-0 flex-col border-b p-6 dark:bg-transparent sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-8">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center font-medium">
            about us
          </div>
          <div className="whitespace-nowrap text-primary-500">Mahaka</div>
        </div>
      </div>
    </div>
  );
};

export default About;
