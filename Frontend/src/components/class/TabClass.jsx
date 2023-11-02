import React from 'react'

const TabClass = ({el, tab, setTab}) => {
  return (
    <li className='nav-item'>
      <a
        className={
          tab === el ? 'nav-link active' : 'nav-link'
        }
        onClick={() => setTab(el)}
        style={{ cursor: 'pointer' }}
      >
        {el}
      </a>
    </li>
  )
}

export default TabClass
