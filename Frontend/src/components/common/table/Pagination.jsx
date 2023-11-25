import React from 'react'

const Pagination = ({paging, handleIncreaseOrDecrease, page, handlePageNumber}) => {
  return (
    <ul className='pagination mt-3' style={{display: 'flex', justifyContent: 'center'}}>
      <li className='page-item' style={{display: page.currentPage > 1 ? 'block' : 'none'}}>
        <a className='page-link' onClick={handleIncreaseOrDecrease} id={'Previous'} style={{ cursor: 'pointer' }}>
          Previous
        </a>
      </li>
      {
        paging.length > 1 &&
        paging.map(
          el => (
            <li className={page.currentPage === el ? 'page-item active' : 'page-item'} key={el}>
              <a className='page-link' onClick={handlePageNumber} id={el} style={{ cursor: 'pointer' }}>
                {el}
              </a>
            </li>
          )
        )
      }
      <li className='page-item' style={{display: page.last === false ? 'block' : 'none'}}>
        <a className='page-link' onClick={handleIncreaseOrDecrease} id={'Next'} style={{ cursor: 'pointer' }}>
          Next
        </a>
      </li>
    </ul>
  )
}

export default Pagination
