import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CardWithTwoSides from "../@main/components/TopTenComponents/CardWithTwoSides/CardWithTwoSides";

export default {
  title: "Cards22 / CardWithTwoSides",
  component: CardWithTwoSides,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof CardWithTwoSides>;

const Template: ComponentStory<typeof CardWithTwoSides> = (args) => (
  <CardWithTwoSides {...args} />
);

export const DefaultCardWithTwoSides = Template.bind({});

DefaultCardWithTwoSides.args = {};
