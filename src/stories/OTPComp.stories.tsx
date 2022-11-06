import { ComponentStory, ComponentMeta } from "@storybook/react";

import OTBComponent from "../app/pages/sign-up/OTPComponent";

export default {
  title: "OTP/OTP",
  component: OTBComponent,
} as ComponentMeta<typeof OTBComponent>;

const Template: ComponentStory<typeof OTBComponent> = (args) => (
  <div className="flex justify-center items-center w-full bg-pagesBg h-screen">
    <OTBComponent {...args} />
  </div>
);

export const Primary = Template.bind({});
