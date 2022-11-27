import { Grid } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ChatWindow from "../app/pages/messages/Components/ChatWindow";

export default {
  title: "Message/ Chat Window",
  component: ChatWindow,
} as ComponentMeta<typeof ChatWindow>;

const Template: ComponentStory<typeof ChatWindow> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12} sm={6} md={3}>
      Choaches
    </Grid.Col>
    <Grid.Col span={12} sm={6} md={7}>
      <ChatWindow {...args} />
    </Grid.Col>
    <Grid.Col className="hodden md:block" span={2}>
      Coach Date
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  name: "Mohammed",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZpsavKh2V2yqCyGQQNZt_BrhRAtcIuNWTw&usqp=CAU",
  // active: true,
};
