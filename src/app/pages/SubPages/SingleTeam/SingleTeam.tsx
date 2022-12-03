import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";
import TeamInfoCard from "./Components/TeamInfoCard";
import TeamPlayers from "./Components/TeamPlayers";
import TeamUpcomingEvents from "./Components/TeamUpcomingEvents";
import { useUserQuery } from "~/app/store/user/userApi";
import { useParams } from "react-router-dom";

type Props = {};

const events = [
  {
    name: "Test",
    date: "11/11/2022",
    address: "ELHaram",
    icon: "https://c.ndtvimg.com/2022-03/mm7k3hj8_ukraine-orphanage-escape-reuters-650_625x300_06_March_22.jpg",
    id: 1,
  },
  {
    name: "Test",
    date: "11/11/2022",
    address: "ELHaram",
    icon: "https://c.ndtvimg.com/2022-03/mm7k3hj8_ukraine-orphanage-escape-reuters-650_625x300_06_March_22.jpg",
    id: 1,
  },
  {
    name: "Test",
    date: "11/11/2022",
    address: "ELHaram",
    icon: "https://c.ndtvimg.com/2022-03/mm7k3hj8_ukraine-orphanage-escape-reuters-650_625x300_06_March_22.jpg",
    id: 1,
  },
];

const SingleTeam = (props: Props) => {
  const { data: user } = useUserQuery(null);

  const { id } = useParams();

  return (
    <div className="py-6 px-2">
      <Grid gutter={"xs"} className="items-stretch">
        <Grid.Col span={12} sm={7} lg={4}>
          <CardDiv>
            <TeamCalendar teamId={id !== undefined ? id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={3}>
          <CardDiv>
            <TeamCoaches teamId={id !== undefined ? id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={7} lg={3}>
          <CardDiv>
            <TeamUpcomingEvents teamId={id !== undefined ? id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={2}>
          <CardDiv>
            <TeamInfoCard teamId={id !== undefined ? id : ""} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12}>
          <CardDiv>
            <TeamPlayers teamId={id !== undefined ? id : ""} />
          </CardDiv>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleTeam;

const CardDiv = ({ children }: any) => {
  return <div className="bg-white p-4 rounded-3xl min-h-full">{children}</div>;
};
