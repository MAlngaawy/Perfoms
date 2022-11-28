import { useState } from "react";
import { Dropdown } from "~/@main/components/Dropdown";
import { Grid, Avatar } from "@mantine/core";
import Card from "~/@main/components/Card";
import { PlayerData } from "~/app/store/types/user-types";
import CustomCalendar from "../../../@main/components/Calendar";
import AddPlayer from "./molecules/AddPlayer";
import { useSelector } from "react-redux";
import {
  selectedPlayerFn,
  selectedPlayerTeamFn,
} from "~/app/store/parent/parentSlice";
import { Link } from "react-router-dom";
import { Player } from "~/app/store/types/parent-types";
import { usePlayerAttendanceQuery } from "~/app/store/attendance/attendanceApi";
import TimeFilter from "~/@main/components/TimeFilter";
import TeamFilter from "~/@main/components/TeamFilter";
import {
  usePlayerCalenderQuery,
  usePlayerSportTeamsQuery,
} from "~/app/store/parent/parentApi";

// dummy data
export const playerData: PlayerData = {
  name: "Ahmed Saleh Mostafa",
  dob: "15/12/2006",
  weight: 50,
  height: 150,
  icon_url:
    "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  sport: {
    name: "kickboxing",
  },
  team: {
    name: "14Th team",
    description: "12-14 years",
    coaches: [
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
      {
        first_name: "Ahmed",
        last_name: "Saleh",
        avatar:
          "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
      },
    ],
  },
  gender: "M",
};

const playerSummary = [
  {
    name: "Strengths",
    number: 8,
    bgColor: "#00E0961A",
    textColor: "#27AE60",
    icon: "/assets/images/gym.png",
  },
  {
    name: "Weaknesses",
    number: 8,
    bgColor: "#EB57571A",
    textColor: "#EB5757",
    icon: "/assets/images/weakness.png",
  },
  {
    name: "Actions",
    number: 8,
    bgColor: "#2F80ED1A",
    textColor: "#2F80ED",
    icon: "/assets/images/tasks.png",
  },
  {
    name: "Recommendations",
    number: 8,
    bgColor: "#00A1FF1A",
    textColor: "#00A1FF",
    icon: "/assets/images/discussion.png",
  },
];

export type Players = {
  name: string;
  icon_url: string;
};

export const players: Players[] = [
  {
    name: "Ahmed Sadek",
    icon_url:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  },
  {
    name: "Ahmed Sadek",
    icon_url:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
  },
];

// ==================

const HomePage = () => {
  const selectedPlayer: Player = useSelector(selectedPlayerFn);
  const selectedPlayerTeam = useSelector(selectedPlayerTeamFn);
  const { data: playerAttendance } = usePlayerCalenderQuery(
    {
      id: selectedPlayer?.id,
    },
    {
      skip: !selectedPlayer?.id,
    }
  );

  const { data: playerSportTeam } = usePlayerSportTeamsQuery(
    {
      player_id: selectedPlayer?.id,
      team_id: selectedPlayerTeam?.id,
    },
    {
      skip: !selectedPlayer?.id || !selectedPlayerTeam?.id,
    }
  );

  console.log("LOLLLLLLLLL", playerSportTeam);

  return (
    <div className="home-page px-5 mb-20">
      <div className="my-4 flex flex-col xs:flex-row gap-2 justify-between items-center">
        <div className="flex gap-3 items-center">
          <AddPlayer />
        </div>
        <div className="flex gap-1 justify-center items-center md:pt-0">
          <TeamFilter />
          <TimeFilter />
        </div>
      </div>
      {selectedPlayer ? (
        <>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={3} span={12}>
              <Card type="playerInfo" playerData={selectedPlayer} />
            </Grid.Col>
            <Grid.Col sm={9} span={12}>
              <Link to="/Reports">
                <Card type="performanceSummary" playerSummary={playerSummary} />
              </Link>
            </Grid.Col>
          </Grid>
          <Grid columns={14} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={4} span={14}>
              <Card type="teamInfo" playerData={selectedPlayer} />
            </Grid.Col>
            <Grid.Col sm={7} span={14}>
              {playerAttendance && (
                <CustomCalendar
                  data={playerAttendance.results.map((item) => ({
                    day: item.day,
                    attendance: item.status,
                  }))}
                />
              )}
              {/* <Card type="calendar" /> */}
            </Grid.Col>
            <Grid.Col sm={3} span={14}>
              <Card type="upcomingEvents" />
            </Grid.Col>
          </Grid>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="card bg-white rounded-xl flex flex-col gap-6 text-center p-8">
            <Avatar
              size={"xl"}
              className="mx-auto"
              src="/assets/images/noplayer.png"
              alt="icon"
            />
            <h2 className="text-4xl text-perfBlue">Welcome on board</h2>
            <p className=" text-lg font-bold text-gray-300">
              Its about time to make a great player.
            </p>
            <div className="flex justify-center items-center">
              <AddPlayer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
