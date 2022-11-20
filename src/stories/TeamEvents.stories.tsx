import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TeamUpcomingEvents from "../app/pages/Admin/SubPages/SingleTeam/Components/TeamUpcomingEvents";
import { Grid } from "@mantine/core";

export default {
  title: "Admin/Team Upcoming Events",
  component: TeamUpcomingEvents,
} as ComponentMeta<typeof TeamUpcomingEvents>;

const Template: ComponentStory<typeof TeamUpcomingEvents> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12} sm={7} lg={3}>
      <div className="bg-white p-4 rounded-3xl">
        <TeamUpcomingEvents {...args} />
      </div>
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  events: [
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
  ],
};
