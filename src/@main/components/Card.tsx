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
  powerType,
  scores,
  playerData,
  playerSummary,
  bg,
  color,
}: CardProps) => {
  if (type === "performanceSummary") {
    // props { playerSummary:PerformanceCardProps[] }
    return (
      <div className="bg-white rounded-3xl px-6 py-2 h-full">
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
        <div className="flex justify-between mt-4 px-2">
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
            <div className="coach flex items-center gap-2 cursor-pointer">
              <Avatar
                size={"sm"}
                radius="xl"
                src={
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="coach_Avatar"
              />
              <h2 className="name text-base">Mohammed</h2>
            </div>
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
