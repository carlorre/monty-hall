interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button = ({ type, label, disabled }: IButtonProps) => (
  <button
    className={`border w-fit bg-montyBlue text-white p-2 rounded-md ${
      disabled ? "hover:cursor-not-allowed opacity-50" : ""
    }`}
    type={type}
  >
    {label}
  </button>
);

export default Button;
