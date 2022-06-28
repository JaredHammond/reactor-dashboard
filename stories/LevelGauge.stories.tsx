import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LevelGauge, LevelGaugeProps } from '../components/LevelGauge';


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
  vesselId: '1',
  data: {
    level: 5,
    minLevel: 0,
    maxLevel: 100
  },
  styles: {
    gaugeColor: '#257a22',
    textColor: '#10570e',
    textColor2: '#67c663',
    textSize: '1.5rem'
  }
};

export const Half = Template.bind({});
Half.args = {
  vesselId: '2',
  data: {
    level: 50,
    minLevel: 0,
    maxLevel: 100
  },
  styles: {
    gaugeColor: '#257a22',
    textColor: '#10570e',
    textColor2: '#67c663',
    textSize: '1.5rem'
  }
};

export const Full = Template.bind({});
Full.args = {
  vesselId: '3',
  data: {
    level: 95,
    minLevel: 0,
    maxLevel: 100
  },
  styles: {
    gaugeColor: '#257a22',
    textColor: '#10570e',
    textColor2: '#67c663',
    textSize: '1.5rem'
  }
};

export const LargerScale = Template.bind({});
LargerScale.args = {
  vesselId: '4',
  data: {
    level: 225,
    minLevel: 32,
    maxLevel: 400,
  },
  styles: {
    gaugeColor: '#257a22',
    textColor: '#10570e',
    textColor2: '#96ef93',
    textSize: '1.5rem',
    decimalPlaces: 1
  }
};