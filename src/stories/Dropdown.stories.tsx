import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Dropdown } from "../@main/components/Dropdown";

export default {
  title: "Example/Dropdown",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  // label: "dropdown",
};
