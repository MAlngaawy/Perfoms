import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AttendanceTable from "../app/pages/reports/components/AttendanceTable";

export default {
  title: "reports/Attendance Table",
  component: AttendanceTable,
} as ComponentMeta<typeof AttendanceTable>;

const Template: ComponentStory<typeof AttendanceTable> = (args) => (
  <div className="flex">
    <AttendanceTable {...args} />
    <AttendanceTable {...args} />
  </div>
);

export const Primary = Template.bind({});

Primary.args = {};
