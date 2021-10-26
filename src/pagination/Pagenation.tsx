import React, { memo } from 'react'

import ArrowButton from '../elements/ArrowButton'
import PageCount from '../pages/Index/PageCount'
import type { PageState } from '../redux/pageSlice'

interface Props {
  page: PageState['page']
  total_page: number
  prevPage: DispatchFuction
  nextPage: DispatchFuction
}

const Pagenation: React.FC<Props> = memo(
  ({ page, total_page, prevPage, nextPage }) => (
    <div className="flex items-center justify-center p-8 px-10 space-x-4">
      <ArrowButton
        direction="left"
        onClick={() => prevPage(page)}
        disabled={page <= 1 ? true : false}
        data-cy="prev-page-btn"
      />
      <PageCount page={page} total_page={total_page} data-cy="page-count" />
      <ArrowButton
        direction="right"
        onClick={() => nextPage(page)}
        disabled={page === total_page ? true : false}
        data-cy="next-page-btn"
      />
    </div>
  )
)
Pagenation.displayName = 'Pagenation'

export default Pagenation
