import { useState } from "react";

export const useValidateNumberInput = () => {
  const [number, setNumber] = useState<number | null>(null);

  const handleChange = (inputValue: string) => {
    const isInteger = /^\d*$/.test(inputValue);
    const parsedNumber = isInteger ? Number(inputValue) : NaN;
    const isWithinRange = parsedNumber > 0 && parsedNumber <= 10000;
    setNumber(isInteger && isWithinRange ? parsedNumber : null);
  };
  return { number, handleChange };
};
