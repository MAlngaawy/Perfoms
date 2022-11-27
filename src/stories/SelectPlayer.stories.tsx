import { ComponentStory, ComponentMeta } from "@storybook/react";
import SelectPlayer from "../app/layouts/layout/components/subComponents/SelectPlayer";

export default {
  title: "toolbar/select player",
  component: SelectPlayer,
} as ComponentMeta<typeof SelectPlayer>;

const Template: ComponentStory<typeof SelectPlayer> = (args) => (
  <SelectPlayer {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  image:
    "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
  name: "Mohammed Alsadek",
  selected: true,
};

export const NotSelected = Template.bind({});

NotSelected.args = {
  image:
    "https://www.anthropics.com/portraitpro/img/page-images/homepage/v22/what-can-it-do-2A.jpg",
  name: "Mohammed Alsadek",
  selected: false,
};
