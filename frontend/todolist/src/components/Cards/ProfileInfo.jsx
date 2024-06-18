import React from "react";
import { getInitials } from "../../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
          {getInitials(userInfo?.fullName)}
        </div>
        <div>
          <div
            id="navbar-with-mega-menu"
            className="hs-collapse overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="">
              <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] ">
                <button
                  id="hs-mega-menu-basic-dr"
                  type="button"
                  className="flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-neutral-400 dark:hover:text-neutral-500 "
                >
                  {userInfo?.fullName}
                  <svg
                    className="ms-1 flex-shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-neutral-800 sm:dark:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                  <button className="py-2 px-4" onClick={onLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
