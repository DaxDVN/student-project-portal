import React from 'react'

const CardStatic = ({ color, iconClass, number, type }) => {
  return (
    <div className="col-xl-3 col-sm-6 col-12 d-flex">
      <div className={color}>
        <div className="card-body">
          <div className="db-widgets d-flex justify-content-between align-items-center">
            <div className="db-icon">
              <i className={iconClass} />
            </div>
            <div className="db-info">
              <h3>{number}</h3>
              <h6>{type}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardStatic
