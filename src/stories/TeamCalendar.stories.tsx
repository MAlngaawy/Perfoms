import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TeamCalendar from "../app/pages/Admin/SubPages/SingleTeam/Components/TeamCalendar";
import { Grid } from "@mantine/core";

export default {
  title: "Admin/Team Calendar",
  component: TeamCalendar,
} as ComponentMeta<typeof TeamCalendar>;

const Template: ComponentStory<typeof TeamCalendar> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12} sm={7} md={4}>
      <div className="bg-white p-4 rounded-3xl">
        <TeamCalendar {...args} />
      </div>
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  teamId: 1,
};
