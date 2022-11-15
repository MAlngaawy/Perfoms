import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SingleCoachLoading from "../app/pages/coaches/SingleCoach/components/SingleCoachLoading";

export default {
  title: "Loading/Single Coach page",
  component: SingleCoachLoading,
} as ComponentMeta<typeof SingleCoachLoading>;

const Template: ComponentStory<typeof SingleCoachLoading> = (args) => (
  <SingleCoachLoading {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
