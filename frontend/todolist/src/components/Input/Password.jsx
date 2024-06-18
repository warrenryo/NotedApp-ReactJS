import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Password = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!isShowPassword);
  };
  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          value={value}
          onChange={onChange}
          type={isShowPassword ? "text" : "password"}
          placeholder={placeholder || "Password"}
          id="password"
          name="password"
          className="py-3 px-4 mr-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          required=""
          aria-describedby="password-error"
        />
        {isShowPassword ? (
          <FaRegEye
            size={22}
            className="text-primary cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        ) : (
          <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={() => toggleShowPassword()}
          />
        )}
      </div>
      <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
        <svg
          className="size-5 text-red-500"
          width={16}
          height={16}
          fill="currentColor"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
        </svg>
      </div>
    </div>
  );
};

export default Password;
