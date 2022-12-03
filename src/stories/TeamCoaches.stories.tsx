import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TeamCoaches from "../app/pages/SubPages/SingleTeam/Components/TeamCoaches";
import { Grid } from "@mantine/core";

export default {
  title: "Admin/Team Coaches",
  component: TeamCoaches,
} as ComponentMeta<typeof TeamCoaches>;

const Template: ComponentStory<typeof TeamCoaches> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12} sm={5} lg={3}>
      <div className="bg-white p-4 rounded-3xl">
        <TeamCoaches {...args} />
      </div>
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  teamId: "1",
};
