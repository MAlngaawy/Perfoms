import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import HomeLoading from "../app/pages/home/organisms/HomeLoading";

export default {
  title: "Loading/Home page",
  component: HomeLoading,
} as ComponentMeta<typeof HomeLoading>;

const Template: ComponentStory<typeof HomeLoading> = (args) => (
  <HomeLoading {...args} />
);

export const Primary = Template.bind({});

Primary.args = {};
