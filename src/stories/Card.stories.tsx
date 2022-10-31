import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from '../@main/components/Card';

export default {
  title: 'Example/Card',
  component: Card,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const ActionsCard = Template.bind({});

ActionsCard.args = {
    header: 'Actions',
    firstText: 'Name of the metric “ left leg”',
    secondText: 'Name of the action  “ need more practicing”',
    detailedText: '10 Exercises to Improve Your Flexibility 1. Standing Quad Stretch. Stand with your feet together. ... 2. Standing Side Stretch. Standing with your feet together, lift your arms overhead. ... 3. Seated Hamstring Stretch. ... 4. Standing Calf Stretch. ... 5. Shoulder Stretch. ... 6. The Forward Hang. ... 7. Back stretch. ... 8. Butterfly Groin Stretch.'
}

export const RecommendationsCard = Template.bind({});

RecommendationsCard.args = {
    header: 'Recommendations',
    firstText: 'Name of the metric “ left leg”',
    secondText: 'Name of the action  “ need more practicing”',
    detailedText: '10 Exercises to Improve Your Flexibility 1. Standing Quad Stretch. Stand with your feet together. ... 2. Standing Side Stretch. Standing with your feet together, lift your arms overhead. ... 3. Seated Hamstring Stretch. ... 4. Standing Calf Stretch. ... 5. Shoulder Stretch. ... 6. The Forward Hang. ... 7. Back stretch. ... 8. Butterfly Groin Stretch.'
}

export const PowerCard = Template.bind({});

PowerCard.args = {
    powerType: 'Strengths',
    scores:[
      {
          name:'Kick',
          score:'2',
      },
      {
          name:'Kick',
          score:'2',
      },
      {
          name:'Kick',
          score:'2',
      },
      {
          name:'Kick',
          score:'2',
      },
      {
          name:'Kick',
          score:'2',
      },
      {
          name:'Kick',
          score:'2',
      },
      ]
}