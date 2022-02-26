import type { ComponentStory } from '@storybook/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Create from './'

export default {
  title: 'Pages/Create',
  component: Create,
}

const Template: ComponentStory<typeof Create> = () => (
  <BrowserRouter>
    <Create />
  </BrowserRouter>
)

export const Default = Template.bind({})
Default.args = {}
