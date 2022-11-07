import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "../@main/components/Button";


export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Button>;


const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  primary: true,
  label: "Button",
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};

export const Basic = Template.bind({});

Basic.args = {
  label: "< Back",
  styles: {
    border: 'unset',
    boxShadow: 'unset',
  },
};

export const BorderButton = Template.bind({});

BorderButton.args = {
  // icon: JSX react icon placeholder ,
  label: "Button",
  styles: {
    boxShadow: 'unset',
    border: '2px solid #2F80ED',
    color: '#2F80ED'
  }
};