import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AttendanceDaysReports from "../app/pages/reports/components/AttendanceDaysReports";

export default {
  title: "reports/Attendance Table",
  component: AttendanceDaysReports,
} as ComponentMeta<typeof AttendanceDaysReports>;

const Template: ComponentStory<typeof AttendanceDaysReports> = (args) => (
  <div className="flex">
    <AttendanceDaysReports {...args} />
    <AttendanceDaysReports {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
