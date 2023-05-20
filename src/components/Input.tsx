interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, type, onChange, min, max }: IInput) => (
  <label className="w-full h-12 px-4 rounded-md flex items-center justify-between border">
    {label}:
    <input
      className="w-20 p-1 ml-4 text-right"
      type={type}
      onChange={onChange}
      min={min}
      max={max}
    />
  </label>
);

export default Input;
