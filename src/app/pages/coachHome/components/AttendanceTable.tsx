import React from "react";
import { Table } from "@mantine/core";

type Props = {};

const elements = [
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
  {
    check: "Check One ",
    name: "Name One",
  },
  {
    check: "Check Two",
    name: "Name Two",
  },
  {
    check: "Check Three",
    name: "Name Three",
  },
];

const rows = elements.map((element, index) => (
  <>
    <td onClick={() => console.log("Cheked")}>{element.check}</td>
  </>
));

const days = new Array(30).fill(15);
console.log("Days", days);

const AttendanceTable = (props: Props) => {
  return (
    <div className="overflow-scroll">
      <Table className="bg-white" highlightOnHover verticalSpacing={"lg"}>
        <thead>
          <tr className=" sticky top-0">
            <th>Day</th>
            {elements.map((element) => (
              <th>{element.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {new Array(30).fill(1).map((item, idx) => {
            console.log(item);
            return (
              <tr>
                <td className="relative">
                  Friday {item}/{idx}/2022
                </td>
                {elements.map((element, index) => (
                  <>
                    <td
                      onClick={() =>
                        console.log("Cheked Item", element.check, " && ", idx)
                      }
                    >
                      {element.check}
                    </td>
                  </>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
