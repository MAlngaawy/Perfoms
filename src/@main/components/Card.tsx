import React from "react";
import { CardProps, PersonData } from "~/app/store/types/user-types";
import Info from "./Info";
import { PerformanceCard } from "~/@main/components/PerformanceCard";
import { Avatar, useMantineTheme } from "@mantine/core";
import AppIcons from "~/@main/core/AppIcons";
import { Calendar } from "@mantine/dates";
import SaleStaticChart from "./SalesStaticChart";

const Card = ({
  type,
  header,
  firstText,
  secondText,
  detailedText,
  powerType,
  scores,
  playerData,
  playerSummary,
  bg,
  color,
}: CardProps) => {
  const theme = useMantineTheme();

  // for test
  const attended = ["4", "6"];
  const absent = ["18", "22"];
  const upcoming = ["13", "26"];

  if (type === "action" || type === "recommendation") {
    // props { header , firstText , secondText , detailedText }
    return (
      <div className="info-card flex flex-col p-6 pb-20 bg-white gap-1 rounded-3xl">
        <h2 className="text-perfGray1 text-base font-semibold">{header}</h2>
        <p>{firstText}</p>
        <p>{secondText}</p>
        <p className=" text-perfGray3 text-sm">{detailedText}</p>
      </div>
    );
  }

  if (type === "playerInfo") {
    // props { playerData }
    return (
      <div className="p-6 h-full bg-white rounded-3xl">
        <div className="playerName">
          <h2>{playerData?.name.split(" ")[0]}'s info</h2>
        </div>
        <div className="img my-2">
          <img
            src={playerData?.icon_url}
            className="w-1/2 h-28 rounded-lg object-cover"
            alt="player_image"
          />
        </div>
        <div className="infos">
          <Info label="Name" value={playerData?.name} />
          <Info label="Age" value={playerData?.dob} />
          <div className="flex justify-between">
            <Info label="Weight" value={`${playerData?.weight} kgm`} />
            <Info label="height" value={`${playerData?.height} cm`} />
          </div>
          <Info label="Sport" value={playerData?.sport?.name} />
        </div>
      </div>
    );
  }

  if (type === "performanceSummary") {
    // props { playerSummary:PerformanceCardProps[] }
    return (
      <div className="bg-white rounded-3xl px-6 py-2">
        <div className="title">
          <h1 className="text-lg font-normal">Performance Report summary</h1>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row justify-between gap-4">
          {playerSummary?.map((item, idx: number) => {
            return (
              <div key={idx} className="w-full sm:w-1/2">
                <PerformanceCard
                  name={item.name}
                  number={item.number}
                  bgColor={item.bgColor}
                  textColor={item.textColor}
                >
                  <img className=" w-6 max-w-full" src={item.icon} alt="icon" />
                </PerformanceCard>
                {/* under progress ========  */}
              </div>
            );
          })}
        </div>
        <SaleStaticChart />
      </div>
    );
  }

  if (type === "teamInfo") {
    // props { playerData }
    return (
      <div className="bg-white p-3 rounded-3xl h-full">
        <h2 className="title text-lg text-perfGray1">Team Info.</h2>
        <div className="flex justify-around mt-4">
          <div className="left flex flex-col gap-3 text-perfGray1">
            <div className="team flex flex-col gap-1">
              <h2 className="text-base font-semibold">
                {playerData?.team?.name}
              </h2>
              <h3 className=" text-perfBlue font-semibold text-sm">
                {playerData?.sport?.name}
              </h3>
            </div>
            <div className="age flex flex-col">
              <p className=" text-perfGray3 text-sm font-normal">Age</p>
              <h2 className=" text-perfGray1 text-base font-normal">
                {playerData?.team?.description}
              </h2>
            </div>
            <div className="geder flex flex-col">
              <p className=" text-perfGray3 text-sm font-normal">Gender</p>
              <h2 className=" text-perfGray1 text-base font-normal">
                {playerData?.gender === "M" ? "Male" : "Female"}
              </h2>
            </div>
          </div>
          <div className="right flex flex-col gap-5">
            <h2 className="mb-2">Coaches</h2>
            {/* {playerData?.team?.coaches?.map((coach: PersonData) => {
              return (
                <div className="coach flex items-center gap-2 cursor-pointer">
                  <Avatar
                    size={"sm"}
                    radius="xl"
                    src={coach.avatar}
                    alt="coach_Avatar"
                  />
                  <h2 className="name text-base">
                    {coach.first_name + " " + coach.last_name}
                  </h2>
                </div>
              );
            })} */}
          </div>
        </div>
      </div>
    );
  }

  if (type === "calendar") {
    return (
      <div className="bg-white p-3 rounded-3xl h-full">
        <h2 className="title text-lg text-perfGray1">Calendar.</h2>
        <div className="flex justify-around gap-3  flex-col 2xl:flex-row">
          <div>
            <div className="flex flex-col gap-2 justify-center h-full w-full  items-center mx-auto">
              <div className="flex sm:flex-col md:flex-row xl:flex-col justify-between my-6 gap-1 sm:gap-4">
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
            </div>
          </div>
          <div
            className=" p-3 2xl:border-0 rounded-xl"
            style={{ width: "250px", height: "290px" }}
          >
            <Calendar
              initialMonth={new Date()}
              dayStyle={(date: Date) =>
                // attended days
                attended.includes(date.getDate().toString())
                  ? {
                      backgroundColor: "#C32B43",
                      color: theme.white,
                      borderRadius: "50%",
                    }
                  : // absent dayes
                  absent.includes(date.getDate().toString())
                  ? {
                      backgroundColor: "#1976D2",
                      color: theme.white,
                      borderRadius: "50%",
                    }
                  : // upcoming days
                  upcoming.includes(date.getDate().toString())
                  ? {
                      color: "#1976D2",
                      borderRadius: "50%",
                      border: "1px solid blue",
                    }
                  : {}
              }
              fullWidth
              styles={(theme: any) => ({
                day: {
                  "&[data-selected]": {
                    backgroundColor: theme.colors.cyan[7],
                    borderRadius: 100,
                    position: "relative",
                  },
                  height: 37,
                  width: 37,
                },
              })}
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === "upcomingEvents") {
    return (
      <div className="bg-white  p-4 rounded-3xl h-full">
        <h2 className="title text-lg text-perfGray1">Upcoming Events.</h2>
        <div className="flex flex-col gap-4 mt-4">
          {playerData?.events.map((event) => (
            <div className="oneEvent flex items-center gap-2">
              <div className="image w-16 h-16">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={event.icon}
                  alt="eventImage"
                />
              </div>
              <div className="info flex flex-col gap-1">
                <h2 className="text-sm text-perfGray1">{event.name}</h2>
                <h3 className="flex items-center text-sm text-perfGray3">
                  <span>
                    <AppIcons icon="CalendarDaysIcon:outline" />
                  </span>
                  {event.date}
                </h3>
                <h3 className="text-sm text-perfGray3">{event.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    // props {scores , bg , color}
    <div className="flex flex-col bg-white py-2 rounded-3xl">
      <div className="power_type px-5 py-2 flex flex-row justify-between">
        <span className={` font-semibold power_type_name ${color}`}>
          {powerType}
        </span>
        <p>Score is out of 5</p>
      </div>
      <div
        className={`power_header ${bg}  px-5 py-2 bg-white flex flex-row justify-between`}
      >
        <h3 className="text-sm">Name</h3>
        <h3 className="text-sm">Score</h3>
      </div>
      {scores?.map((power, index) => {
        return (
          <div
            key={index}
            className="power_score  px-5 py-2 flex flex-row justify-between"
          >
            <h3 className="text-sm">{power.name}</h3>
            <h3 className={`font-semibold ${color} text-sm`}>{power.score}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
