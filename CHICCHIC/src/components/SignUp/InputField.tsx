import type { InputFieldProps } from "../../types/inputfieldtypes"

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
    <label className="text-base font-semibold text-[#AB3130]">
      {label}
    </label>
    <div className="flex gap-2 mt-2 text-[#AB3130]">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`text-sm flex-1 px-4 py-2 border-1 border-[#AB3130] text-[#AB3130] rounded-full focus:outline-none placeholder-[#AB3130] placeholder-opacity-60 ${className}`}
      />
      {children}
    </div>
  </div>
);