import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { HistoryRouter } from 'redux-first-history/rr6'

import { history } from '../../redux/store'

import Layout from '.'

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
}

export default meta

export const Default: StoryObj<typeof Layout> = {
  render: () => (
    <HistoryRouter history={history}>
      <Layout>
        <div
          style={{
            border: 'solid 1px #000',
            borderRadius: 8,
            fontSize: 24,
            fontWeight: 'bold',
            padding: 200,
            textAlign: 'center',
          }}
        >
          Layout Component
        </div>
      </Layout>
    </HistoryRouter>
  ),
}
