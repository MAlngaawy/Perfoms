import { Grid } from "@mantine/core";
import React from "react";
import CustomCalendar from "~/@main/components/Calendar";
import Card from "~/@main/components/Card";
import { useNavigate } from "react-router-dom";

type Props = {};

const dummyData = [
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },

  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },

  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
  {
    image:
      "https://images.squarespace-cdn.com/content/v1/555b5271e4b01e1078b507c9/1507748548198-FGFV23QUHHF2VHAFUT1C/squarespace-SHP-kids2_0003.jpg?format=2500w",
    name: "Hamza Mohammed Ahmed",
    id: 1,
  },
];

const TeamInfo = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="m-4">
      <Grid gutter={"sm"}>
        <Grid.Col span={12} sm={4}>
          <Card type="teamInfo" />
        </Grid.Col>
        <Grid.Col span={12} xs={8} sm={5}>
          <CustomCalendar
            data={[{ attendance: "ABSENT", day: "11-11-2022" }]}
          />
        </Grid.Col>
        <Grid.Col span={12} xs={4} sm={3}>
          <Card type="upcomingEvents" />
        </Grid.Col>
        <Grid.Col
          className="bg-white p-4 rounded-3xl flex gap-4 justify-start items-center flex-wrap"
          span={12}
        >
          {dummyData.map((player) => {
            return (
              <div
                key={player.id}
                className="shadow-xl cursor-pointer transform hover:scale-105 rounded-lg w-28 text-center bg-white flex flex-col justify-center items-center"
                onClick={() => navigate("/players")}
              >
                <img
                  className="rounded-lg w-full h-28 object-cover"
                  src={player.image}
                  alt="player Image"
                />
                <h2 className="text-base">{player.name}</h2>
              </div>
            );
          })}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default TeamInfo;
