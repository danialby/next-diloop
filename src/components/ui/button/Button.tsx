import React, { ReactNode } from "react";
import './style.css'

interface ButtonProps {
  children: ReactNode; // Button text or content
  size?: "sm" | "md"; // Button size
  variant?: "primary" | "outline"; // Button variant
  startIcon?: ReactNode; // Icon before the text
  endIcon?: ReactNode; // Icon after the text
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disabled state
  loading?: boolean; // Disabled state
  className?: string; // Disabled state
  testId?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  loading = false,
  testId="",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-4 py-3 text-sm",
    md: "px-5 py-3.5 text-sm",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white hover:bg-brand-600 disabled:bg-brand-300",
    outline:
      "bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300",
  };

  return (
    <button
      data-testid={testId}
      className={`inline-flex items-center justify-center font-medium gap-2 rounded-lg transition ${
        sizeClasses[size]
      } ${variantClasses[variant]} 
       ${className}
      ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }
      ${loading && "opacity-80 cursor-default pointer-events-none"}`}
      onClick={onClick}
      disabled={disabled}
    >

      {startIcon && <span className="flex items-center">{startIcon}</span>}
      {loading ?
          <div aria-label="Loading"
               className="relative inline-flex flex-col gap-2 items-center justify-center">
            <div className="relative flex w-5 h-5">
              <i
                  className="absolute w-full h-full rounded-full border-2 border-b-primary animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent">
              </i>
              <i
                  className="absolute w-full h-full rounded-full border-2 border-b-primary opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent">
              </i>
            </div>
          </div>
          :
          children
      }
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
