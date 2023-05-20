import { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface IInput {
  label?: string;
  type: HTMLInputTypeAttribute;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, onChange }: IInput) => (
  <label className="h-12 px-4 rounded-md flex items-center justify-between border">
    {label}:
    <input
      className="w-20 p-1 ml-4 text-right"
      type={type}
      onChange={onChange}
    />
  </label>
);

export default Input;
