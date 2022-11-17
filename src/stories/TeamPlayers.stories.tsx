import { ComponentStory, ComponentMeta } from "@storybook/react";
import TeamPlayers from "../app/pages/Admin/SubPages/SingleTeam/Components/TeamPlayers";
import { Grid } from "@mantine/core";

export default {
  title: "Admin/Team Players",
  component: TeamPlayers,
} as ComponentMeta<typeof TeamPlayers>;

const Template: ComponentStory<typeof TeamPlayers> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12}>
      <div className="bg-white p-4 rounded-3xl">
        <TeamPlayers {...args} />
      </div>
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {};
