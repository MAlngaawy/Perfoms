import { ComponentStory, ComponentMeta } from "@storybook/react";
import ConnectedUserInfo from "../app/pages/messages/Components/ConnectedUserInfo";
import { Grid } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

export default {
  title: "Message/ ConnectedUserInfo",
  component: ConnectedUserInfo,
} as ComponentMeta<typeof ConnectedUserInfo>;

const Template: ComponentStory<typeof ConnectedUserInfo> = (args) => (
  <BrowserRouter>
    <Grid className="bg-pagesBg min-h-screen">
      <Grid.Col span={12} sm={6} md={3}>
        Choaches
      </Grid.Col>
      <Grid.Col span={12} sm={6} md={7}>
        Window
      </Grid.Col>
      <Grid.Col className="hidden md:block" span={2}>
        <ConnectedUserInfo {...args} />
      </Grid.Col>
    </Grid>
  </BrowserRouter>
);

export const Primary = Template.bind({});

Primary.args = {
  name: "Mohammed",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkZpsavKh2V2yqCyGQQNZt_BrhRAtcIuNWTw&usqp=CAU",
  education: "Bachelor of Physical Education",
  sport: "Taekwondo",
  teams: ["Team One", "Team Two", "Team three"],
  id: 1,
};
