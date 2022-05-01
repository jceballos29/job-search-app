import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
      <h3>Jon Search</h3>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/login">Sing in</NavLink>
        <NavLink to="/register">Sing up</NavLink>
      </div>
    </div>
  )
}

export default Navigation