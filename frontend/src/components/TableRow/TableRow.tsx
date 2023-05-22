import { ITableData } from "../../hooks/useFormSubmit";

const TableRow = ({ heading, value }: ITableData) => (
  <tr>
    <th className="p-2 border">{heading}</th>
    <td className="p-2 border w-1/6">{value}</td>
  </tr>
);

export default TableRow;
