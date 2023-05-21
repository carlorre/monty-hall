import { InputHTMLAttributes } from "react";

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = ({ label, onChange }: ICheckbox) => (
  <label
    className="w-full h-12 px-4 rounded-md flex items-center justify-between border hover:cursor-pointer"
    data-testid="checkbox-label"
  >
    {label}
    <input
      className="accent-montyBlue hover:cursor-pointer h-4 w-4"
      type="checkbox"
      onChange={onChange}
      data-testid="checkbox"
    />
  </label>
);

export default Checkbox;
