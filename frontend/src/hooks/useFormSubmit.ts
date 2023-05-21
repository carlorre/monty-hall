import { useState } from "react";
import axios from "axios";
export interface ITableData {
  heading: string;
  value: number;
}

const url = "http://127.0.0.1:3000/montyHall/simulate";

export const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    numberOfSimulations: number,
    shouldChangeDoor: boolean
  ) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(url, {
        numberOfSimulations,
        shouldChangeDoor,
      })
      .then((res) => {
        const {
          numberOfSimulations,
          wins,
          losses,
          winPercentage,
          lossPercentage,
        } = res.data;
        setTableData([
          {
            heading: "Number of simulations",
            value: numberOfSimulations,
          },
          { heading: "Wins", value: wins },
          { heading: "Losses", value: losses },
          { heading: "Win percentage", value: winPercentage },
          {
            heading: "Loss percentage",
            value: lossPercentage,
          },
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { handleSubmit, loading, tableData };
};

export default useFormSubmit;
