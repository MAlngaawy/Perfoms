import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Grid } from "@mantine/core";
import CoachExperince from "../app/pages/coaches/SingleCoach/components/CoachExperince";

export default {
  title: "Cards/Coah Experinces",
  component: CoachExperince,
} as ComponentMeta<typeof CoachExperince>;

const Template: ComponentStory<typeof CoachExperince> = (args) => (
  <Grid className=" bg-slate-300">
    <Grid.Col className="mx-auto" xs={12} md={7}>
      <CoachExperince {...args} />
    </Grid.Col>
  </Grid>
);

export const Primary = Template.bind({});

Primary.args = {
  experinces: [
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
    {
      start: "10/10/2020",
      end: "10/10/2022",
      title: "Martial Arts Instructor ",
      works: [
        "Voluptatibus sequi deserunt id.",
        "quaerat optio ullam atque aut eligendi ea commodi?",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
        "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
      ],
    },
  ],
  qualifications: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
  courses: [
    "Voluptatibus sequi deserunt id.",
    "quaerat optio ullam atque aut eligendi ea commodi?",
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    "Eaque aspernatur suscipit fuga perferendis numquam quisquam non nesciunt error,",
  ],
};
