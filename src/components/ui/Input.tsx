import React from "react";

interface InputProps {
  type: "text" | "password" | "email" | "number";
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, className, errorMessage }) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`px-4 py-2 border rounded-lg ${className} ${errorMessage ? "border-red-500" : "border-gray-300"}`}
      />
      {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  );
};

export default Input;
