import { useState } from "react";
import { Dropdown } from "~/@main/components/Dropdown";
import { Grid } from "@mantine/core";
import Card from "~/@main/components/Card";
import { PlayerData } from "~/app/store/types/user-types";
import CustomCalendar from "../../../@main/components/Calendar";
import AddPlayer from "./molecules/AddPlayer";
import { useSelector } from "react-redux";
import { selectedPlayerFn } from "~/app/store/parent/parentSlice";

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
  const [team, setTeam] = useState("Team");
  const [week, setWeek] = useState("Week");
  const selectedPlayer = useSelector(selectedPlayerFn);
  return (
    <div className="home-page px-5 mb-20">
      <div className="flex my-4 flex-col md:flex-row justify-between items-center">
        <div className="flex gap-3 flex-col md:flex-row justify-between items-center">
          <AddPlayer />
        </div>
        <div className="flex flex-col md:flex-row gap-3 justify-center items-center pt-3 md:pt-0">
          <Dropdown
            values={["team 1", "team 2", "team 3"]}
            selected={team}
            setSelected={setTeam}
          />
          <Dropdown
            values={["this week", "last week"]}
            selected={week}
            setSelected={setWeek}
            className="bg-none bg-white p-2 rounded-full"
          />
        </div>
      </div>
      {selectedPlayer ? (
        <>
          <Grid columns={12} gutter={"sm"}>
            <Grid.Col sm={3} span={12}>
              <Card type="playerInfo" playerData={selectedPlayer} />
            </Grid.Col>
            <Grid.Col sm={9} span={12}>
              {/* <Link to="/Reports">
            <Card type="performanceSummary" playerSummary={selectedPlayer} />
          </Link> */}
            </Grid.Col>
          </Grid>
          <Grid columns={14} gutter={"sm"} className="info mt-3">
            <Grid.Col sm={4} span={14}>
              <Card type="teamInfo" playerData={selectedPlayer} />
            </Grid.Col>
            <Grid.Col sm={7} span={14}>
              <CustomCalendar
                data={[
                  { day: "11/4/2022", attendance: "ATTENDED" },
                  { day: "11/6/2022", attendance: "ABSENT" },
                  { day: "11/11/2022", attendance: "ATTENDED" },
                  { day: "11/15/2022", attendance: "ATTENDED" },
                  { day: "11/22/2022", attendance: "ABSENT" },
                  { day: "11/25/2022", attendance: "ATTENDED" },
                  { day: "11/29/2022", attendance: "UPCOMING" },
                ]}
              />
              {/* <Card type="calendar" /> */}
            </Grid.Col>
            <Grid.Col sm={3} span={14}>
              <Card type="upcomingEvents" />
            </Grid.Col>
          </Grid>
        </>
      ) : (
        <p className="place-self-center">No Players Related To This User</p>
      )}
    </div>
  );
};

export default HomePage;
