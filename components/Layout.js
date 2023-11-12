import React from 'react'
import Nav from './Nav'
import CurrentGames from './CurrentGames'

function Layout({children}) {
  return (
    <>
        <Nav />
       
        <main>{children}</main>
    </>
  )
}

export default Layout