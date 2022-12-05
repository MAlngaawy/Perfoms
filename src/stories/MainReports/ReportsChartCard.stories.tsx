import { Grid } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ReportsChartCard from "../../@main/components/MainReports/ReportsChartCard";

export default {
  title: "Main Reports/ Report Chart",
  component: ReportsChartCard,
} as ComponentMeta<typeof ReportsChartCard>;

const Template: ComponentStory<typeof ReportsChartCard> = (args) => (
  <div className="flex gap-2 h-screen w-full bg-pagesBg p-40">
    <ReportsChartCard {...args} />
    <ReportsChartCard {...args} />
    <ReportsChartCard {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {
  name: "Taekwondo",
  data: [
    {
      name: "strengths",
      value: 50,
    },
    {
      name: "moderate",
      value: 60,
    },
    {
      name: "weaknesses",
      value: 300,
    },
  ],
};
