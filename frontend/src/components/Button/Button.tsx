import { ReactNode } from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loader?: ReactNode;
}

const Button = ({ type, label, disabled, loader }: IButtonProps) => (
  <button
    className={`h-12 flex w-full items-center justify-between border bg-montyBlue text-white px-4 rounded-md ${
      disabled ? "hover:cursor-default opacity-80" : ""
    }`}
    type={type}
  >
    <div>{label}</div>
    {loader && <div className="ml-4">{loader}</div>}
  </button>
);

export default Button;
