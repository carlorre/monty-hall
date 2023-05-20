import { useState } from "react";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";
import { useValidateNumberInput } from "./hooks/useValidateNumberInput";

const App = () => {
  const { number, handleChange } = useValidateNumberInput();
  const [changeDoor, setChangeDoor] = useState(false);

  const handleSubmit = () => {
    console.log(number, changeDoor);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-6">
      <h1 className="font-latinCondensed textShadow text-7xl text-montyOrange text-center">
        Monty Hall Problem Simulator
      </h1>

      <form
        className="flex flex-col mt-20 items-center h-full justify-center gap-y-2"
        onSubmit={handleSubmit}
      >
        <Input
          label="Number of simulations"
          type="number"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Checkbox
          label="Change door?"
          onChange={() => setChangeDoor(!changeDoor)}
        />
        <Button disabled={!number} label="Simulate" />
      </form>
    </div>
  );
};

export default App;
