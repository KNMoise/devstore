import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = "button", className, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${className} ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
