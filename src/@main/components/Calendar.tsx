import { Calendar } from "@mantine/dates";

type Props = {
  data: { day: string; attendance: "ATTENDED" | "ABSENT" | "UPCOMING" }[];
};

const CustomCalendar = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-3xl p-4">
      <h2 className="title text-lg text-perfGray1">Calendar.</h2>
      <div className="calendar flex flex-col xs:flex-row w-full justify-center items-center xs:justify-around ">
        <div className="details flex my-4 flex-wrap xs:flex-col gap-4 justify-center items-start">
          <div className="flex gap-1">
            <div className="dot w-5 h-5 rounded-full bg-perfBlue"></div>
            <h2>Attended</h2>
          </div>
          <div className=" flex gap-1">
            <div className="dot w-5 h-5 rounded-full bg-perfSecondary"></div>
            <h2>Absent</h2>
          </div>
          <div className=" flex gap-1">
            <div className="dot w-5 h-5 rounded-full border border-perfBlue"></div>
            <h2>Upcoming</h2>
          </div>
        </div>
        <div className="datePicker overflow-scroll">
          <Calendar
            initialMonth={new Date(2021, 7)}
            dayStyle={(date) =>
              date.getDay() === 5 && date.getDate() === 13
                ? { backgroundColor: "#f00", color: "#00f" }
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
