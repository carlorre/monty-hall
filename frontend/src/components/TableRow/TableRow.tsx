import { ITableData } from "../../hooks/useFormSubmit";

const TableRow = ({ heading, value }: ITableData) => (
  <tr>
    <th className="p-2 border">{heading}</th>
    <td className="p-2 border">{value}</td>
  </tr>
);

export default TableRow;
