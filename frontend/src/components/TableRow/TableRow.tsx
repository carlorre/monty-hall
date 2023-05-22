export interface ITableRowData {
  heading: string;
  value: number;
}

const TableRow = ({ heading, value }: ITableRowData) => (
  <tr>
    <th className="p-2 border">{heading}</th>
    <td className="p-2 border w-1/6">{value}</td>
  </tr>
);

export default TableRow;
