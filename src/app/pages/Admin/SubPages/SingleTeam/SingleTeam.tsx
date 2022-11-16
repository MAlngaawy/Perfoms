import { Grid } from "@mantine/core";
import TeamCalendar from "./Components/TeamCalendar";
import TeamCoaches from "./Components/TeamCoaches";

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
          <CardDiv>Events</CardDiv>
        </Grid.Col>
        <Grid.Col span={12} sm={6} lg={2}>
          <CardDiv>Info</CardDiv>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default SingleTeam;

const CardDiv = ({ children }: any) => {
  return <div className="bg-white p-4 rounded-3xl min-h-full">{children}</div>;
};
