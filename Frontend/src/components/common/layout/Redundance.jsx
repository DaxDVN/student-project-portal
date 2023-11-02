import React from 'react'

const Redundancy = () => {
  return (
    <div className="row">
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card flex-fill fb sm-box">
          <i className="fab fa-facebook" />
          <h6>50,095</h6>
          <p>Likes</p>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card flex-fill twitter sm-box">
          <i className="fab fa-twitter" />
          <h6>48,596</h6>
          <p>Follows</p>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card flex-fill insta sm-box">
          <i className="fab fa-instagram" />
          <h6>52,085</h6>
          <p>Follows</p>
        </div>
      </div>
      <div className="col-xl-3 col-sm-6 col-12">
        <div className="card flex-fill linkedin sm-box">
          <i className="fab fa-linkedin-in" />
          <h6>69,050</h6>
          <p>Follows</p>
        </div>
      </div>
    </div>
  )
}

export default Redundancy
