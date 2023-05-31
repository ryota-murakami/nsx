import { CogIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

import Memo from '../../lib/memo'

import { onCloseHander } from './onCloseHander'

const SettingLink: React.FC = Memo.html(() => {
  return (
    <Link
      onClick={onCloseHander}
      to="/dashboard/setting"
      data-cy="setting-link"
      className="group flex items-center rounded-md bg-gray-900 px-2 py-2 text-base font-medium text-white"
    >
      <CogIcon className="mr-4 h-6 w-6 flex-shrink-0 text-gray-300" />
      Setting
    </Link>
  )
})
SettingLink.displayName = 'SettingLink'

export default SettingLink