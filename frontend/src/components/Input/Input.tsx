import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = ({ label, type, onChange, min, max, required }: IInput) => (
  <label className="w-full h-12 px-4 rounded-md flex items-center justify-between border">
    {label}
    <input
      className="w-20 p-1 ml-4 text-right"
      type={type}
      onChange={onChange}
      min={min}
      max={max}
      required={required}
    />
  </label>
);

export default Input;
