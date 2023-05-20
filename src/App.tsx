import { useState } from "react";
import Input from "./components/Input";
import Checkbox from "./components/Checkbox";
import Button from "./components/Button";
import { useValidateNumberInput } from "./hooks/useValidateNumberInput";
import TableRow from "./components/TableRow";

export interface ITableData {
  heading: string;
  value: number;
}

const App = () => {
  const { number, handleChange } = useValidateNumberInput();
  const [changeDoor, setChangeDoor] = useState(false);
  const [loading, setLoading] = useState(false);

  const [tableData, setTableData] = useState<ITableData[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!number) return;
    console.log("send request");
    setLoading(true);
    setTimeout(() => {
      const mockResponse = {
        simulations: 15,
        wins: 10,
        losses: 5,
        winPercentage: 66.67,
        lossPercentage: 33.33,
      };

      setTableData([
        { heading: "Number of simulations", value: mockResponse.simulations },
        { heading: "Wins", value: mockResponse.wins },
        { heading: "Losses", value: mockResponse.losses },
        { heading: "Win percentage", value: mockResponse.winPercentage },
        { heading: "Loss percentage", value: mockResponse.lossPercentage },
      ]);
      setLoading(false);
    }, 5000);
  };

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
            label="Number of simulations"
            type="number"
            onChange={(e) => handleChange(e.target.value)}
            min={1}
            max={10000}
          />
          <Checkbox
            label="Change door?"
            onChange={() => setChangeDoor(!changeDoor)}
          />
          <Button
            type="submit"
            label="Simulate"
            disabled={!number}
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
