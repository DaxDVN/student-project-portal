import React from 'react'
import UserTableRow from './UserTableRow.jsx'
import Pagination from '../common/table/Pagination.jsx';

const UserTable = (
  {
    userList,
    load,
    setLoad,
    page,
    paging,
    handlePageNumber,
    handleIncreaseOrDecrease,
    setSort,
    sort
  },
) => {
  
  const switchArrowDirection = () => {
    const arrows = document.querySelectorAll('.arrow');
    arrows.forEach((arrow) => {
      if (arrow.classList.contains('down')) {
        arrow.classList.remove('down');
        arrow.classList.add('up');
      }
    });
  };
  
  const sortColumn = (e) => {
    switchArrowDirection();
    if (e.currentTarget.lastChild.getAttribute('class') === 'arrow up ml-1'){
      e.currentTarget.lastChild.setAttribute('class', 'arrow down ml-1')
    } else{
      e.currentTarget.lastChild.setAttribute('class', 'arrow up ml-1')
    }
    const sortBy = e.currentTarget.getAttribute('id');
    setSort((prevSort) => {
      if (prevSort.sortBy === sortBy) {
        const newOrder = prevSort.order === 'ascend' ? 'descend' : 'ascend';
        return { sortBy, order: newOrder };
      } else {
        return { sortBy, order: 'ascend' };
      }
    });
    console.log(sort);
  };
  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='card card-table'>
          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table table-hover table-center mb-0 datatable'>
                <thead>
                <tr>
                  <th id={'id'} onClick={sortColumn}>
                    ID
                    <i className={'arrow up ml-1'}></i>
                  </th>
                  <th id={'fullName'} onClick={sortColumn}>
                    Full name
                    <i className={'arrow up ml-1'}></i>
                  </th>
                  <th id={'email'} onClick={sortColumn}>
                    Email
                    <i className={'arrow up ml-1'}></i>
                  </th>
                  <th id={'phone'} onClick={sortColumn}>
                    Phone
                    <i className={'arrow up ml-1'}></i>
                  </th>
                  <th id={'role'} onClick={sortColumn}>
                    Role
                    <i className={'arrow up ml-1'}></i>
                  </th>
                  <th>Status</th>
                  <th className='text-right'>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                  userList != null &&
                  userList.map(
                    ( el ) => (
                      <UserTableRow key={ el.id } user={ el }
                                    load={ load } setLoad={ setLoad }
                      />
                    ),
                  )
                }
                </tbody>
              </table>
              <Pagination page={ page } paging={ paging } handlePageNumber={ handlePageNumber }
                          handleIncreaseOrdecrease={ handleIncreaseOrDecrease } />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTable
