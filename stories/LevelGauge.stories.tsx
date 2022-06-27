import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LevelGauge } from '../components/LevelGauge';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Dashboard/LevelGauge',
  component: LevelGauge,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof LevelGauge>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LevelGauge> = (args) => <LevelGauge {...args} />;

export const Low = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Low.args = {
  level: 5
};

export const Half = Template.bind({});
Half.args = {
  level: 50
};

export const Full = Template.bind({});
Full.args = {
  level: 95
};