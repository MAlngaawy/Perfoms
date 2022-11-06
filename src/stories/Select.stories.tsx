import { ComponentStory, ComponentMeta } from "@storybook/react";

import PerfSelect from "../@main/components/Select";

export default {
  title: "Form/Select",
  component: PerfSelect,
} as ComponentMeta<typeof PerfSelect>;

const Template: ComponentStory<typeof PerfSelect> = (args) => (
  <PerfSelect {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: "Who are you",
  placeHolder: "Pick One",
  data: [
    { label: "Parent", value: "Parent" },
    { label: "Coach", value: "Coach" },
  ],
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Country",
  placeHolder: "Pick One",
  data: [
    { label: "Egypt", value: "EG" },
    { label: "United Sudia", value: "US" },
  ],
  error: "This is invalled",
};
