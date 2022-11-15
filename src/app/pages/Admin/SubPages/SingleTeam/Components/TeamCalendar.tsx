import { useState } from "react";
import { Calendar } from "@mantine/dates";
import classNames from "classnames";

type Props = {
  teamId: number;
};

const dates = [
  new Date("11/11/2022").getTime(),
  new Date("10/15/2022").getTime(),
  new Date("10/11/2022").getTime(),
];

const TeamCalendar = ({ teamId }: Props) => {
  const [value, setValue] = useState(null);

  return (
    <div>
      <h2>Team Calendar</h2>
      <div className="w-full flex justify-center">
        <Calendar
          sx={{
            ".mantine-Calendar-day": {
              width: 30,
              height: 30,
              lineHeight: "30px",
              margin: 2,
            },
          }}
          value={value}
          onChange={() => setValue}
          renderDay={(date) => {
            const day = date.getDate();
            return (
              <div
                className={classNames("", {
                  "border rounded-full border-perfBlue": dates.includes(
                    date.getTime()
                  ),
                })}
              >
                {day}
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};

export default TeamCalendar;
