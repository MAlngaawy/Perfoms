import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CoachesLoading from "../app/pages/coaches/components/CoachesLoading";

export default {
  title: "Loading/Coaches Page",
  component: CoachesLoading,
} as ComponentMeta<typeof CoachesLoading>;

const Template: ComponentStory<typeof CoachesLoading> = (args) => (
  <CoachesLoading {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
