import { NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '../../../features/common/commonSlice.js'

const NavLinkSideBar = (prop) => {
  const element = prop.element
  const nameActive = prop.active
  const subNavLink = element.sub_links
  const navigate = useNavigate()
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

  const { isSidebarOpen } = useSelector((store) => store.common)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsSubmenuOpen(false)
    }
  }, [isSidebarOpen])

  const navigateLink = (e) => {
    e.preventDefault()
    if (!isSidebarOpen) {
      dispatch(toggleSidebar())
    }
    const elementTarget = e.currentTarget
    if (subNavLink.length === 0) {
      prop.setActive(elementTarget.getAttribute('name'))
      navigate(element.path)
    } else {
      setIsSubmenuOpen(!isSubmenuOpen)
    }
  }
  if (prop.user === undefined){
    return
  }
  console.log()
  if (prop.element.roles === undefined){
    return
  }
  
  if (!prop.element.roles.includes(prop.user.role)){
    return
  }
  return (
    <li
      className={element.text === nameActive ? 'submenu active' : 'submenu'}
      key={element.id}
    >
      <a
        href={''}
        onClick={navigateLink}
        key={element.text}
        name={element.text}
      >
        <i className="fas fa-user-graduate" /> <span> {element.text}</span>{' '}
        {element.text !== 'Dashboard' && <span className="menu-arrow" />}
      </a>
    </li>
  )
}

export default NavLinkSideBar
