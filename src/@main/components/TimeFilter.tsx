import { useState, useEffect } from "react";
import { RangeCalendar } from "@mantine/dates";
import { Menu, Button } from "@mantine/core";
import AppIcons from "./../../@main/core/AppIcons";
import useWindowSize from "../hooks/useWindowSize";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { timeFilter, timeFilterFn } from "./../../app/store/parent/parentSlice";

type Props = {};

const thisWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 36; // last day is the first day + 6

  return {
    firstday: new Date(curr.setDate(first)),
    lastday: new Date(curr.setDate(last)),
  };
};

const lastWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() - 7; // First day is the day of the month - the day of the week
  var last = first + 36; // last day is the first day + 6

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
  var last = first + 43; // last day is the first day + 6

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

const formatDate = (date: Date | null) => {
  if (date) {
    const today = date;
    const yyyy = today.getFullYear();
    let mm: string | number = today.getMonth() + 1; // Months start at 0!
    let dd: string | number = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return yyyy + "-" + mm + "-" + dd;
  }
};

const TimeFilter = (props: Props) => {
  const [value, setValue] = useState<[Date | null, Date | null]>([
    thisWeek().firstday,
    thisWeek().lastday,
  ]);
  const [opened, setOpened] = useState(false);
  const [textValue, setTextValue] = useState<string>("This Week");
  const windwSize = useWindowSize();
  const dispatch = useDispatch();

  dispatch(
    timeFilter(
      localStorage.getItem("TimeFilter")
        ? JSON.parse(localStorage.getItem("TimeFilter") || "")
        : {
            from_date: formatDate(value[0]),
            to_date: formatDate(value[1]),
          }
    )
  );

  useEffect(() => {
    if (value[1] && value[0]) {
      // setTextValue(`${formatDate(value[0])} - ${formatDate(value[1])}`);
      // setOpened(false);
      console.log(value);
      dispatch(
        timeFilter({
          from_date: formatDate(value[0]),
          to_date: formatDate(value[1]),
        })
      );
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
          <button className="flex gap-4 xs:gap-10 items-center bg-white rounded-full px-4 xs:px-6 py-2">
            <AppIcons
              icon="CalendarDaysIcon:outline"
              className="w-4 h-4 text-black"
            />
            <span className="flex items-center gap-1">
              {textValue}{" "}
              <AppIcons className="w-3" icon="ChevronDownIcon:outline" />{" "}
            </span>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col xs:flex-row gap-2">
            <div className="dates flex flex-col items-center justify-center gap-2 sm:border-r  border-neutral-200">
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
                filterFun={lastYear}
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
