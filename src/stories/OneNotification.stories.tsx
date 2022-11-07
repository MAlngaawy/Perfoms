import { ComponentStory, ComponentMeta } from "@storybook/react";
import OneNotification from "../app/pages/notifications/components/OneNotification";

export default {
  title: "Notifications/ One Notification",
  component: OneNotification,
} as ComponentMeta<typeof OneNotification>;

const Template: ComponentStory<typeof OneNotification> = (args) => (
  <OneNotification {...args} />
);

export const NewOne = Template.bind({});

NewOne.args = {
  type: "Permission",
  name: "Ahmed Ali",
  content:
    "Hey mr: ahmed hru, mohamed is doing great, he needs to practice more kicking on left leg.",
  date: "2020/1/15, 4:30am",
  image:
    "https://images.squarespace-cdn.com/content/v1/54d96fcde4b0af07ca2a8871/1616629467192-HQSTI9MSL8ES895CWWCK/Linked+in_-3.jpg",
  newNotification: true,
};

export const OldOne = Template.bind({});

OldOne.args = {
  type: "Certificate",
  name: "Mohammed LL",
  content:
    "Hey mr: ahmed hru, mohamed is doing great, he needs to practice more kicking on left leg.",
  date: "2020/1/15, 4:30am",
  image:
    "https://images.squarespace-cdn.com/content/v1/54d96fcde4b0af07ca2a8871/1616629467192-HQSTI9MSL8ES895CWWCK/Linked+in_-3.jpg",
  newNotification: false,
};
