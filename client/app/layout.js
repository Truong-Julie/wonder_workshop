import React from 'react'
import { Link } from 'react-router'

const Layout = (props) => (
  <div className='app-container'>
    <header>
      <Link to='/'>
        DIY Project App
      </Link>
    </header>
    {props.children}
  </div>
)

const { element } = React.PropTypes

Layout.propTypes = {
  children: element
}

export default Layout

