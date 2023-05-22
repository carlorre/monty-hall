import { useState } from "react";
import { Button, TableRow, Checkbox, Input } from "./components";
import { useValidateNumberInput } from "./hooks/useValidateNumberInput";
import useFormSubmit from "./hooks/useFormSubmit";
import goat from "../assets/goat.png";

const App = () => {
  const [shouldChangeDoor, setShouldChangeDoor] = useState(false);
  const { number, handleChange } = useValidateNumberInput();
  const { tableData, loading, handleSubmit, errorMessage } = useFormSubmit();

  return (
    <div className="h-screen w-full flex flex-col items-center pt-6">
      <div className="max-w-md px-2 xs:p-0">
        <h1 className="font-latinCondensed textShadow text-7xl text-montyOrange text-center ">
          MONTY HALL SIMULATOR
        </h1>
        <form
          className="flex flex-col mt-20 items-center justify-center gap-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            number && handleSubmit(number, shouldChangeDoor);
          }}
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
            onChange={() => setShouldChangeDoor(!shouldChangeDoor)}
          />
          <Button
            type="submit"
            label="Simulate"
            disabled={!number || loading}
            loader={
              <img
                src={goat}
                className={`h-6 ${loading ? "animate-spin" : ""}`}
                alt="spinner"
              />
            }
          />
        </form>
        {errorMessage && (
          <div className="mt-2 text-red-600">{errorMessage}</div>
        )}
        <div className="flex justify-center items-center mt-10 w-full">
          {tableData && !loading && (
            <table className="text-left border w-full pr-4">
              {tableData.map(({ heading, value }) => (
                <TableRow key={heading} heading={heading} value={value} />
              ))}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
