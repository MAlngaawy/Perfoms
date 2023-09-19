import { useState, useEffect } from "react";
import { RangeCalendar } from "@mantine/dates";
import { Menu, Button } from "@mantine/core";
import AppIcons from "./../../@main/core/AppIcons";
import useWindowSize from "../hooks/useWindowSize";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { timeFilter, timeFilterFn } from "./../../app/store/parent/parentSlice";
import { selectedPlayerTeamFn } from "../../app/store/parent/parentSlice";
import { useTeamInfoQuery } from "~/app/store/parent/parentApi";
import { useCoachTeamInfoQuery } from "~/app/store/coach/coachApi";
import { CoachTeamInfo } from "~/app/store/types/coach-types";

type Props = {};

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
    thisMonth().firstday,
    thisMonth().lastday,
  ]);
  const [opened, setOpened] = useState(false);
  const [textValue, setTextValue] = useState<string>("This Month");
  const [teamInfoData, setTeamInfoData] = useState<CoachTeamInfo>();
  const windwSize = useWindowSize();
  const dispatch = useDispatch();

  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);

  const { data: parentTeamInfoData } = useTeamInfoQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  const { data: coachTeamInfoData } = useCoachTeamInfoQuery(
    { team_id: selectedPlayerTeam?.id },
    { skip: !selectedPlayerTeam }
  );

  useEffect(() => {
    if (parentTeamInfoData) setTeamInfoData(parentTeamInfoData);
    if (coachTeamInfoData) setTeamInfoData(coachTeamInfoData);
  }, [parentTeamInfoData, coachTeamInfoData]);

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
              <span className="text-xs xs:text-base">{textValue} </span>
              <AppIcons className="w-3" icon="ChevronDownIcon:outline" />{" "}
            </span>
          </button>
        </Menu.Target>

        <Menu.Dropdown>
          <div className="flex flex-col xs:flex-row gap-2 border-r border-gray-500">
            <div className="dates flex flex-col items-center justify-center gap-2">
              {teamInfoData?.rate_per === "Week" && (
                <>
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
                </>
              )}
              {teamInfoData?.rate_per === "Two_Weeks" ||
                (teamInfoData?.rate_per === "Week" && (
                  <>
                    <FilterType
                      type="Last Two Week"
                      setTextValue={setTextValue}
                      setValue={setValue}
                      textValue={textValue}
                      filterFun={last2Weeks}
                    />
                  </>
                ))}
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
    <span className="border-b w-full ">
      <Menu.Item
        onClick={() => {
          setValue([filterFun().firstday, filterFun().lastday]);
          setTextValue(type);
        }}
        className={classNames(
          "px-6 py-2 w-full text-left cursor-pointer text-perfGray3",
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
