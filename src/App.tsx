import { useState } from "react";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [changeDoor, setChangeDoor] = useState(false);

  const handleSubmit = () => {
    console.log(inputValue, changeDoor);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1>Monty Hall Simulation</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="numberInput">Number of Simulations:</label>
          <input
            id="numberInput"
            type="number"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="changeDoor">Change door</label>
          <input
            id="changeDoor"
            type="checkbox"
            onChange={() => setChangeDoor(!changeDoor)}
          />
        </div>
        <button type="submit">Simulate</button>
      </form>
    </div>
  );
};

export default App;
