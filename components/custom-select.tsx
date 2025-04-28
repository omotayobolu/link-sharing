import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useRef, useEffect, forwardRef } from "react";
import { Controller, Control } from "react-hook-form";

export type Option = {
  id: string;
  value: string;
  icon: string;
};

interface CustomSelectProps {
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string;
}

const SelectBase = forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      options,
      value,
      onChange,
      placeholder = "Select a platform",
      className = "",
      error,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(dropdownRef.current);
        } else {
          ref.current = dropdownRef.current;
        }
      }
    }, [ref]);

    const selectedOption = value;

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelectOption = (option: Option) => {
      console.log(option);
      onChange(option);
      setIsOpen(false);
    };

    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className={`relative flex items-center justify-between w-full pl-11 p-3 text-left bg-white border cursor-pointer ${
            error ? "border-red" : "border-border"
          } ${isOpen && "border-primary-purple shadow-input"} rounded-lg `}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span
            className={`block text-base ${
              !selectedOption ? "text-dark-grey" : ""
            } ${error ? "text-red" : ""}`}
          >
            {selectedOption.value !== "" ? selectedOption.value : placeholder}
          </span>
          {selectedOption.value !== "" ? (
            <Icon
              icon={selectedOption.icon}
              width="16px"
              height="16px"
              className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
            />
          ) : (
            <Icon
              icon="ph:link-bold"
              width="16px"
              height="16px"
              className="text-grey absolute top-1/2 left-4 translate-y-[-50%]"
            />
          )}
          <div className="ml-2">
            <Icon
              icon="iconoir:nav-arrow-down"
              width="24"
              height="24"
              color="#633cff"
              className={`transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-md max-h-60 overflow-y-auto">
            <ul className="py-1 px-4">
              {options.length > 0 ? (
                options.map((option) => (
                  <li
                    key={option.value}
                    className={`py-3 flexrow items-center gap-3 cursor-pointer text-dark-grey hover:text-primary-purple border-b border-border ${
                      option.value === selectedOption.value
                        ? " text-primary-purple font-medium"
                        : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <Icon icon={option.icon} width="16" height="16" />
                    <p className="text-inherit">{option.value}</p>
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-sm text-gray-500">
                  No options found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SelectBase.displayName = "SelectBase";

interface ControlledSelectProps {
  name: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  className?: string;
  rules?: any;
}

export function FormSelect({
  name,
  control,
  options,
  placeholder,
  className,
  rules,
}: ControlledSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <SelectBase
          options={options}
          value={field.value}
          onChange={field.onChange}
          placeholder={placeholder}
          className={className}
          error={error?.message}
          ref={field.ref}
        />
      )}
    />
  );
}

export default SelectBase;
