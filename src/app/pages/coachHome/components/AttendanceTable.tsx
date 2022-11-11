import React from "react";
import { Table, Checkbox } from "@mantine/core";

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
    <td onClick={() => console.log("Cheked")}>
      {" "}
      <Checkbox />{" "}
    </td>
  </>
));

const days = new Array(30).fill(15);
console.log("Days", days);

const AttendanceTable = (props: Props) => {
  return (
    <div className="overflow-scroll max-h-screen relative m-6 bg-white rounded-lg text-center">
      <Table highlightOnHover>
        <thead>
          <tr className="">
            <th className="bg-white sticky  top-0 z-20 ">Day</th>
            {elements.map((element) => (
              <th className="bg-white sticky top-0 z-20">{element.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {new Array(30).fill(1).map((item, idx) => {
            console.log(item);
            return (
              <tr className="">
                <td className=" sticky left-0 bg-white z-10">
                  Friday {item}/{idx}/2022
                </td>
                {elements.map((element, index) => (
                  <>
                    <td
                      onClick={() =>
                        console.log("Cheked Item", element.check, " && ", idx)
                      }
                    >
                      <Checkbox />
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
