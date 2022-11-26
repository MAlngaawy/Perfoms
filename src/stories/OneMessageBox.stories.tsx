import { ComponentStory, ComponentMeta } from "@storybook/react";
import OneMessageBox from "../@main/components/OneMessageBox";

export default {
  title: "Message/ One MessageBox",
  component: OneMessageBox,
} as ComponentMeta<typeof OneMessageBox>;

const Template: ComponentStory<typeof OneMessageBox> = (args) => (
  <OneMessageBox {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  image:
    "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
  isActive: true,
  name: "John Doue",
  lastMessageText:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
  lastMessageTime: "1:30 pm",
  unreadMessagesNumber: 3,
};

export const NotActive = Template.bind({});

NotActive.args = {
  image:
    "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
  isActive: false,
  name: "John Doue",
  lastMessageText:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, voluptatum? Quos sed officiis assumenda officia modi, magnam odio saepe hic vel quisquam facere aspernatur dolorum ea consequatur eos, quae tenetur.",
  lastMessageTime: "10:30 am",
  unreadMessagesNumber: 0,
};
