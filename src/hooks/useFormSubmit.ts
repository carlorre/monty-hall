import { useState } from "react";

export interface ITableData {
  heading: string;
  value: number;
}

export const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return { handleSubmit, loading, tableData };
};

export default useFormSubmit;
