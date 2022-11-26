import { useState, useEffect } from "react";
import { RangeCalendar } from "@mantine/dates";
import { Menu, Button } from "@mantine/core";
import AppIcons from "./../../@main/core/AppIcons";
import useWindowSize from "../hooks/useWindowSize";
import classNames from "classnames";

type Props = {};

const thisWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  return {
    firstday: new Date(curr.setDate(first)),
    lastday: new Date(curr.setDate(last)),
  };
};

const lastWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 7; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));
  return {
    firstday,
    lastday,
  };
};

const last2Weeks = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 14; // First day is the day of the month - the day of the week
  var last = first + 13; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));
  return {
    firstday,
    lastday,
  };
};

const thisMonth = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  let firstday = new Date(y, m, 1);
  let lastday = new Date(y, m + 1, 0);
  return {
    firstday,
    lastday,
  };
};

const lastMonth = () => {
  let date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth() - 1;
  let firstday = new Date(y, m, 1);
  let lastday = new Date(y, m + 1, 0);
  return { firstday, lastday };
};

const thisYear = () => {
  let firstday = new Date(new Date().getFullYear(), 0, 1);
  let lastday = new Date(new Date().getFullYear(), 11, 31);
  return { firstday, lastday };
};

const lastYear = () => {
  let firstday = new Date(new Date().getFullYear() - 1, 0, 1);
  let lastday = new Date(new Date().getFullYear() - 1, 11, 31);
  return { firstday, lastday };
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
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="dates flex flex-col items-center justify-center gap-2 sm:border-r border-neutral-700">
              <FilterType
                type="This Week"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={thisWeek}
              />
              <FilterType
                type="Last Week"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={lastWeek}
              />
              <FilterType
                type="Last Two Week"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={last2Weeks}
              />
              <FilterType
                type="This Month"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={thisMonth}
              />
              <FilterType
                type="Last Month"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={lastMonth}
              />
              <FilterType
                type="This Year"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={thisYear}
              />
              <FilterType
                type="Last Year"
                setTextValue={setTextValue}
                setValue={setValue}
                textValue={textValue}
                filterFun={thisYear}
              />
            </div>

            <div className="calendar">
              <RangeCalendar
                amountOfMonths={
                  windwSize.width && windwSize.width > 768 ? 2 : 1
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

const FilterType = ({
  type,
  setValue,
  setTextValue,
  textValue,
  filterFun,
}: {
  type: any;
  setValue: any;
  setTextValue: any;
  textValue: any;
  filterFun: any;
}) => {
  return (
    <span className="border-b w-full  ">
      <Menu.Item
        onClick={() => {
          setValue([filterFun().firstday, filterFun().lastday]);
          setTextValue(type);
        }}
        className={classNames(
          "p-2 w-full text-left cursor-pointer text-perfGray3",
          {
            "bg-gray-100": textValue === type,
          }
        )}
      >
        <span>{type}</span>
      </Menu.Item>
    </span>
  );
};
