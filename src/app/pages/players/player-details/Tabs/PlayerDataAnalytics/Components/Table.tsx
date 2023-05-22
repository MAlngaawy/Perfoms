import { useState } from "react";
import cn from "classnames";
interface TableProps {
  data?: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const keys = Object.keys(data[0]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);

  const handleRowMouseEnter = (index: number) => {
    setHoveredRowIndex(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {keys.map((key) => (
            <th
              key={key}
              className=" w-1/3 px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
              hoveredRowIndex === index ? "hover:bg-blue-200" : ""
            }`}
            onMouseEnter={() => handleRowMouseEnter(index)}
            onMouseLeave={handleRowMouseLeave}
          >
            {keys.map((key) => (
              <td
                key={key}
                className={cn(
                  "px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                )}
              >
                <span
                  className={cn("py-1", {
                    "bg-blue-100 px-3 text-blue-500 rounded-full":
                      key === "value" || key === "Value",
                    hidden: !item[key],
                  })}
                >
                  {item[key]}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
