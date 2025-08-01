import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  children?: React.ReactNode; // 버튼 등 추가 요소
}

export const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  children,
}: InputFieldProps) => (
  <div>
    <label className="text-sm font-semibold text-[#AB3130]">
      {label}
    </label>
    <div className="flex gap-2 mt-1 text-[#AB3130]">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`text-sm flex-1 px-4 py-1 border-1 border-[#AB3130] text-[#AB3130] rounded-full focus:outline-none placeholder-[#AB3130] placeholder-opacity-60 ${className}`}
      />
      {children}
    </div>
  </div>
);