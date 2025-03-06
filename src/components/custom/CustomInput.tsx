import React, {FC, useState} from "react";

interface InputProps {
    type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
    id?: string;
    name?: string;
    placeholder?: string;
    defaultValue?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    min?: string;
    max?: string;
    step?: number;
    disabled?: boolean;
    success?: boolean;
    error?: boolean;
    hint?: string; // Optional hint text
    floatingLabel?: boolean; // Optional hint text
}

const CustomInput: FC<InputProps> = ({
                                   type = "text",
                                   id,
                                   name,
                                   placeholder,
                                   defaultValue,
                                   onChange,
                                   className = "",
                                   min,
                                   max,
                                   step,
                                   disabled = false,
                                   success = false,
                                   error = false,
                                   hint,
                                   floatingLabel = false,
                               }) => {
    // Determine input styles based on state (disabled, success, error)
    let inputClasses = `h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`;

    // Add styles for the different states

    if (disabled) {
        inputClasses += ` text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
    } else if (error) {
        inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
    } else if (success) {
        inputClasses += ` text-success-500 border-success-400 focus:ring-success-500/10 focus:border-success-300  dark:text-success-400 dark:border-success-500`;
    }
    else {
        inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    if (floatingLabel) {
        inputClasses += `relative z-2 focus:placeholder:hidden bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800`;
    }
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [hasValue, setHasValue] = useState<boolean>(false);
    const handleOnFocus = () => {
        setIsFocused(true)
    }
    const handleOnBlur = () => {
        setIsFocused(false)
    }

    const handleOnInput = (e: React.FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.length > 0) {
            setHasValue(true);
        }
        else {
            setHasValue(false);
        }
    }

    return (
        <div className="relative group w-full">
            <input
                type={type}
                id={id}
                name={name}
                placeholder={!floatingLabel ? placeholder : ''}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={inputClasses}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                onChange={onChange}
                onInput={(e) => handleOnInput(e)}
            />

            {floatingLabel && <span className={`absolute transition-all duration-300 right-4 top-2.5  scale-100 -z-1 text-gray-300  ${(isFocused || hasValue) && '  !text-blue-500 p-0.75 px-0.5 z-10 !right-0 !-top-5.5 text-xs'}`}>{placeholder}</span>}

            {/* Optional Hint Text */}
            {hint && (
                <p
                    className={`mt-1.5 text-xs ${
                        error
                            ? "text-error-500"
                            : success
                                ? "text-success-500"
                                : "text-gray-500"
                    }`}
                >
                    {hint}
                </p>
            )}

        </div>
    );
};

export default CustomInput;
