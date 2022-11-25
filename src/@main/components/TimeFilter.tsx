import { useState, useEffect } from "react";
import { RangeCalendar } from "@mantine/dates";
import { Menu, Button } from "@mantine/core";
import AppIcons from "./../../@main/core/AppIcons";
import useWindowSize from "../hooks/useWindowSize";

type Props = {};

const thisWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
  console.log([firstday, lastday]);
};

const lastWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 7; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
  console.log([firstday, lastday]);
};

const last2Weeks = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 14; // First day is the day of the month - the day of the week
  var last = first + 13; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toUTCString();
  var lastday = new Date(curr.setDate(last)).toUTCString();
  console.log([firstday, lastday]);
};

const thisMonth = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let firstDate = new Date(y, m, 1);
  let lastDate = new Date(y, m + 1, 0);
  console.log([firstDate, lastDate]);
};

const lastMonth = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth() - 1;
  let firstDate = new Date(y, m, 1);
  let lastDate = new Date(y, m + 1, 0);
  console.log([firstDate, lastDate]);
};

const thisYear = () => {
  let firstDate = new Date(new Date().getFullYear(), 0, 1);
  let lastDate = new Date(new Date().getFullYear(), 11, 31);
  console.log([firstDate, lastDate]);
};

const lastYear = () => {
  let firstDate = new Date(new Date().getFullYear() - 1, 0, 1);
  let lastDate = new Date(new Date().getFullYear() - 1, 11, 31);
  console.log([firstDate, lastDate]);
};

const TimeFilter = (props: Props) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [opened, setOpened] = useState(false);
  const [textValue, setTextValue] = useState<string>("Select The Time");
  const windwSize = useWindowSize();

  useEffect(() => {
    if (value[1]) {
      console.log(value);
      setOpened(false);
    }
  }, [value]);

  return (
    <div>
      <Menu
        transition="rotate-right"
        transitionDuration={150}
        opened={opened}
        onChange={setOpened}
      >
        <Menu.Target>
          <button className="flex gap-6 items-center bg-white rounded-full px-6 py-2 m-10">
            <AppIcons
              icon="CalendarDaysIcon:outline"
              className="w-4 h-4 text-black"
            />
            <span>{textValue}</span>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col gap-2">
            <div className="dates flex flex-col items-center justify-center gap-2 border-r">
              <Menu.Item className="p-2 cursor-pointer text-perfGray3 border-b">
                DayOne
              </Menu.Item>
            </div>
            <div className="calendar flex flex-col">
              <RangeCalendar
                amountOfMonths={
                  windwSize.width && windwSize.width > 700 ? 2 : 1
                }
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};
export default TimeFilter;
