import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportsPageLoading from "../app/pages/reports/components/ReportsPageLoading";

export default {
  title: "Loading/Reports Page",
  component: ReportsPageLoading,
} as ComponentMeta<typeof ReportsPageLoading>;

const Template: ComponentStory<typeof ReportsPageLoading> = (args) => (
  <ReportsPageLoading {...args} />
);

export const Performance = Template.bind({});

Performance.args = {
  type: "Performances",
};

export const Attendances = Template.bind({});

Attendances.args = {
  type: "Attendances",
};
