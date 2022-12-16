import { Grid } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TotalAttendance from "../app/pages/reports/components/TotalAttendance";

export default {
  title: "reports/Total Attendance",
  component: TotalAttendance,
} as ComponentMeta<typeof TotalAttendance>;

const Template: ComponentStory<typeof TotalAttendance> = (args) => (
  <Grid className="h-screen w-full bg-pagesBg p-4">
    <Grid.Col xs={12} md={4}>
      <TotalAttendance {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {};
