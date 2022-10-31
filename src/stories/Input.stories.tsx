import { ComponentStory, ComponentMeta } from "@storybook/react";

import PerfInput from "../@main/components/Input";

export default {
  title: "Form/Input",
  component: PerfInput,
} as ComponentMeta<typeof PerfInput>;

const Template: ComponentStory<typeof PerfInput> = (args) => (
  <PerfInput {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  type: "text",
  label: "Test",
};

export const WithError = Template.bind({});
WithError.args = {
  type: "number",
  label: "Number Test",
  error: "This is Invaled",
};
