import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Teams from "../app/pages/Admin/Components/Teams";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Admin/Teams",
  component: Teams,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ], //Wrapping the story inside the router
} as ComponentMeta<typeof Teams>;

const Template: ComponentStory<typeof Teams> = (args) => (
  <div className="bg-pagesBg w-full min-h-screen">
    <Teams {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  data: [
    {
      id: 1,
      icon: "https://freepngimg.com/thumb/football/1-football-ball-png-image-thumb.png",
      name: "14Th Team",
      sport: "Taekwondo",
      age: { from: 12, to: 15 },
      players: 30,
    },
    {
      id: 2,
      icon: "https://freepngimg.com/thumb/football/1-football-ball-png-image-thumb.png",
      name: "14Th Team",
      sport: "Taekwondo",
      age: { from: 15, to: 18 },
      players: 15,
    },
  ],
};
