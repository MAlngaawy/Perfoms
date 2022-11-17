import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";
import TeamInfoCard from "./Components/TeamInfoCard";
import TeamUpcomingEvents from "./Components/TeamUpcomingEvents";

type Props = {};

// Helper Dummy Data
const coaches = [
  {
    name: "Coach One",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 1,
  },
  {
    name: "Coach Two",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 2,
  },
  {
    name: "Coach Three",
    image:
      "https://previews.123rf.com/images/blueskyimage/blueskyimage1311/blueskyimage131101911/23810213-sport-trainer-portrait-of-happy-young-coach.jpg",
    id: 3,
  },
  {
    name: "Coach Four",
    image:
      "https://static.clubs.nfl.com/image/private/t_person_squared_mobile/f_auto/jaguars/gpvbkyjpty6w3kpdkv9m.jpg",
    id: 4,
  },
];

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
  return (
    <div className="py-6 px-2">
      <Grid gutter={"xs"} className="items-stretch">
        <Grid.Col span={12} sm={7} lg={4}>
          <CardDiv>
            <TeamCalendar teamId={1} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={5} lg={3}>
          <CardDiv>
            <TeamCoaches coaches={coaches} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={7} lg={3}>
          <CardDiv>
            <TeamUpcomingEvents events={events} />
          </CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={6} lg={2}>
          <CardDiv>
            <TeamInfoCard />
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
