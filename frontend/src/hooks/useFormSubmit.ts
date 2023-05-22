import { useState } from "react";
import axios from "axios";
export interface ITableData {
  heading: string;
  value: number;
}

const url = import.meta.env.VITE_APP_MONTY_HALL_API_URL;

export const useFormSubmit = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (
    numberOfSimulations: number,
    shouldChangeDoor: boolean
  ) => {
    setLoading(true);
    setTableData([]);
    setErrorMessage("");

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
        setErrorMessage(err.message);
        setLoading(false);
      });
  };

  return { handleSubmit, loading, tableData, errorMessage };
};

export default useFormSubmit;
