import { ComponentStory, ComponentMeta } from "@storybook/react";

import PerfScoreTable from "../@main/components/PerfScoreTable";

export default {
  title: "Tables/ Perf Score Table",
  component: PerfScoreTable,
} as ComponentMeta<typeof PerfScoreTable>;

const Template: ComponentStory<typeof PerfScoreTable> = (args) => (
  <PerfScoreTable {...args} />
);

export const Primary = Template.bind({});
