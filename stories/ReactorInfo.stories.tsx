import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ReactorInfo } from '../components/ReactorInfo';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Dashboard/ReactorInfo',
  component: ReactorInfo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ReactorInfo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ReactorInfo> = (args) => <ReactorInfo />;

export const Basic = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args