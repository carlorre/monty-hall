import { ChangeEvent } from "react";

interface ICheckbox {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, onChange }: ICheckbox) => (
  <label className="h-12 px-4 w-full rounded-md flex items-center justify-between border hover:cursor-pointer">
    {label}
    <input
      className="accent-montyBlue hover:cursor-pointer h-4 w-4"
      type="checkbox"
      onChange={onChange}
    />
  </label>
);

export default Checkbox;
