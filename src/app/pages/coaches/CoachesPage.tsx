import { Grid } from "@mantine/core";
import React from "react";
import CoachCard from "./components/CoachCard";

type Props = {
  coaches?: object[];
};

const coachesDummyData = [
  {
    id: 1,
    role: "Coach",
    name: "Mohammed Ali",
    education: "Bachelor of Physical Education",
    teams: ["Team 1", "Team 2", "Team 3"],
    photo:
      "https://st.depositphotos.com/1008939/1880/i/950/depositphotos_18807295-stock-photo-portrait-of-handsome-man.jpg",
    sport: "Taekwondo",
  },
  {
    id: 2,
    role: "Supervisor",
    name: "Amr Mohammed",
    education: "Bachelor of Physical Education",
    teams: ["boues1", "Team 14"],
    photo:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
    sport: "Ride horse",
  },
  {
    id: 3,
    role: "Coach",
    name: "Salma 3Amr",
    education: "Bachelor of Physical Education",
    teams: ["Girls14", "17th"],
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-UU5DAxPwAVgajh8tg4C2mKRk3Oc0dx08A&usqp=CAU",
    sport: "Swemming",
  },
  {
    id: 4,
    role: "Coach",
    name: "Mohammed Ali",
    education: "Bachelor of Physical Education",
    teams: ["Team 1", "Team 2", "Team 3"],
    photo:
      "https://st.depositphotos.com/1008939/1880/i/950/depositphotos_18807295-stock-photo-portrait-of-handsome-man.jpg",
    sport: "Taekwondo",
  },
  {
    id: 5,
    role: "Supervisor",
    name: "Amr Mohammed",
    education: "Bachelor of Physical Education",
    teams: ["boues1", "Team 14"],
    photo:
      "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=2000",
    sport: "Ride horse",
  },
  {
    id: 6,
    role: "Coach",
    name: "Salma 3Amr",
    education: "Bachelor of Physical Education",
    teams: ["Girls14", "17th"],
    photo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ-UU5DAxPwAVgajh8tg4C2mKRk3Oc0dx08A&usqp=CAU",
    sport: "Swemming",
  },
];

const CoachesPage = ({ coaches }: Props) => {
  return (
    <div className="coaches p-2">
      <Grid gutter={10}>
        {coachesDummyData.map((coach) => {
          return (
            <Grid.Col xs={6} sm={4} md={3}>
              <CoachCard
                key={coach.id}
                id={coach.id}
                role={
                  coach.role === "Supervisor" || coach.role === "Supervisor"
                    ? coach.role
                    : "Coach"
                }
                name={coach.name}
                education={coach.education}
                teams={coach.teams}
                photo={coach.photo}
                sport={coach.sport}
              />
            </Grid.Col>
          );
        })}
      </Grid>
    </div>
  );
};

export default CoachesPage;
