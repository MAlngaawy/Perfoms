import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Menu } from "@mantine/core";
import AppIcons from "./../../@main/core/AppIcons";
import { useDispatch, useSelector } from "react-redux";
import { timeFilter, timeFilterFn } from "./../../app/store/parent/parentSlice";

type Props = {};

const TimeFilter = (props: Props) => {
  const [value, setValue] = useState<Date | null>(null);

  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Changed Onse");
    setValue(new Date());
  }, []);

  useEffect(() => {
    console.log("valuevaluevalue", value?.toString());

    dispatch(
      timeFilter({
        month: Number(value?.getMonth()) + 1,
        year: value?.getFullYear(),
      })
    );
  }, [value]);

  return (
    <div>
      <Menu
        //@ts-ignore
        className="w-full xs:w-auto"
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
              <span className="text-xs xs:text-base">
                {Number(value?.getMonth()) + 1 + " - " + value?.getFullYear()}{" "}
              </span>
              <AppIcons className="w-3" icon="ChevronDownIcon:outline" />{" "}
            </span>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col xs:flex-row gap-2 border-r border-gray-500">
            <div className="calendar">
              <Calendar
                initialLevel="month"
                sx={{
                  ".mantine-Calendar-monthPickerControlActive": {
                    backgroundColor: "#1c7ed6",
                  },
                  ".mantine-Calendar-yearPickerControlActive": {
                    backgroundColor: "#1c7ed6",
                  },
                  ".mantine-Calendar-yearPickerControls": {
                    gap: 1,
                  },
                }}
                initialMonth={value || new Date()}
                onMonthChange={(date) => {
                  setValue(date);
                  console.log(
                    "defaultLeveldefaultLevel DATEDATEDATEDATE",
                    date?.getMonth()
                  );
                  setOpened(false);
                }}
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

// Helper Constants
export const thisWeek = () => {
  const today = new Date();
  const daysToSaturday = 6 - today.getDay();
  const saturday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysToSaturday
  );
  const firstDay = new Date(
    saturday.getFullYear(),
    saturday.getMonth(),
    saturday.getDate() - 6
  );
  const lastDay = saturday;
  return { firstday: firstDay, lastday: lastDay };
};

export const lastWeek = () => {
  const today = new Date();
  const daysToSaturday = 6 - today.getDay();
  const saturday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysToSaturday
  );
  const lastSaturday = new Date(
    saturday.getFullYear(),
    saturday.getMonth(),
    saturday.getDate() - 7
  );
  const firstDay = new Date(
    lastSaturday.getFullYear(),
    lastSaturday.getMonth(),
    lastSaturday.getDate() - 6
  );
  const lastDay = lastSaturday;
  return { firstday: firstDay, lastday: lastDay };
};

export const last2Weeks = () => {
  const today = new Date();
  const daysToSaturday = 6 - today.getDay();
  const saturday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysToSaturday
  );
  const firstDay = new Date(
    saturday.getFullYear(),
    saturday.getMonth(),
    saturday.getDate() - 13
  );
  const lastDay = saturday;
  return { firstday: firstDay, lastday: lastDay };
};

export const thisMonth = () => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return { firstday: firstDayOfMonth, lastday: lastDayOfMonth };
};

export const lastMonth = () => {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const firstDayOfLastMonth = new Date(
    lastMonth.getFullYear(),
    lastMonth.getMonth(),
    1
  );
  const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  return { firstday: firstDayOfLastMonth, lastday: lastDayOfLastMonth };
};

export const thisYear = () => {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
  return { firstday: firstDayOfYear, lastday: lastDayOfYear };
};

export const lastYear = () => {
  const today = new Date();
  const lastYear = new Date(today.getFullYear() - 1, 0, 1);
  const firstDayOfLastYear = new Date(lastYear.getFullYear(), 0, 1);
  const lastDayOfLastYear = new Date(today.getFullYear() - 1, 11, 31);
  return { firstday: firstDayOfLastYear, lastday: lastDayOfLastYear };
};
