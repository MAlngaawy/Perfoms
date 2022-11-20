import { Grid } from "@mantine/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AllUserMessagesBox from "../app/pages/messages/Components/AllUserMessagesBox";

export default {
  title: "Message/ All Messages",
  component: AllUserMessagesBox,
} as ComponentMeta<typeof AllUserMessagesBox>;

const Template: ComponentStory<typeof AllUserMessagesBox> = (args) => (
  <Grid className="bg-pagesBg min-h-screen">
    <Grid.Col span={12} sm={6} md={3}>
      <AllUserMessagesBox {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {};
