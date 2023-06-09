import { Grid } from "@mantine/core";
import Achievements from "./Components/Achievements/Achievements";
import Experiences from "./Components/Experiences/Experiences";
import PersonalInfo from "./Components/PersonalInfo/ParsonalInfo";

type Props = {};

const PlayerBio = (props: Props) => {
  return (
    <div className="py-6">
      <Grid className="" gutter="sm">
        <Grid.Col xs={12} md={3}>
          <PersonalInfo />
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <Experiences />
        </Grid.Col>
        <Grid.Col xs={12} md={5}>
          <Achievements />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default PlayerBio;
