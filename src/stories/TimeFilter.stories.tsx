import { ComponentStory, ComponentMeta } from "@storybook/react";
import TimeFilter from "../@main/components/TimeFilter";

export default {
  title: "Time/ Time Filter",
  component: TimeFilter,
} as ComponentMeta<typeof TimeFilter>;

const Template: ComponentStory<typeof TimeFilter> = (args) => (
  <div className="h-screen bg-pagesBg">
    <TimeFilter {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
