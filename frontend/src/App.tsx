import { useState } from "react";
import { Button, TableRow, Checkbox, Input } from "./components";
import { useValidateNumberInput } from "./hooks/useValidateNumberInput";
import useFormSubmit from "./hooks/useFormSubmit";

const App = () => {
  const [changeDoor, setChangeDoor] = useState(false);
  const { number, handleChange } = useValidateNumberInput();
  const { tableData, loading, handleSubmit } = useFormSubmit();

  return (
    <div className="h-screen flex flex-col items-center pt-6">
      <div className="max-w-5xl">
        <h1 className="font-latinCondensed textShadow text-7xl text-montyOrange text-center">
          Monty Hall Simulator
        </h1>

        <form
          className="flex flex-col mt-20 items-center justify-center gap-y-2"
          onSubmit={handleSubmit}
        >
          <Input
            label="Number of simulations:"
            type="number"
            onChange={(e) => handleChange(e.target.value)}
            min={1}
            max={10000}
            required
          />
          <Checkbox
            label="Change door?"
            onChange={() => setChangeDoor(!changeDoor)}
          />
          <Button
            type="submit"
            label="Simulate"
            disabled={!number || loading}
            loader={
              <img
                src="assets/goat.png"
                className={`h-6 ${loading ? "animate-spin" : ""}`}
              />
            }
          />
        </form>
        <div className="flex justify-center items-center mt-20 w-full">
          {tableData && !loading && (
            <table className="text-left border w-full pr-4">
              {tableData.map(({ heading, value }) => (
                <TableRow heading={heading} value={value} />
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;