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
  coaches: [
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
  ],
};
