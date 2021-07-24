import React, { memo, PropsWithChildren } from 'react'
import Header from './Header'
import Footer from './Footer'
import { concatSelecor } from '../utils'

interface Props {
  className?: string
}

const Layout = memo<PropsWithChildren<Props>>(
  ({ children, className, ...props }) => {
    let baseStyle = 'container mx-auto flex-grow px-4 py-3'
    if (className) {
      baseStyle = concatSelecor(baseStyle, className)
    }

    return (
      <div
        className="flex flex-col justify-between w-screen h-screen"
        {...props}
      >
        <Header />
        <main className={baseStyle}>{children}</main>
        <Footer />
      </div>
    )
  }
)

export default Layout
