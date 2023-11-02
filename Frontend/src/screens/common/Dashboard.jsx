
import React from 'react'
import HeaderContent from '../../components/common/layout/HeaderContent.jsx';
import CardStatic from '../../components/common/table/CardStatic.jsx';
import TableRow from '../../components/class/TableRow.jsx';

export const starStudent = [
  {
    class_id: 'PRE2209',
    id: 1,
    fullName: 'Alex',
    className: '10A',
    mobile: '097 3584 5870',
    address: '911 Deer Ridge Drive,USA',
    role: 'student',
    mark: '1185',
    percentage: '98%',
    year: '2019'
  },
  {
    class_id: 'PRE2209',
    id: 2,
    fullName: 'John Smith',
    className: '10A',
    mobile: '097 3584 5870',
    address: '911 Deer Ridge Drive,USA',
    role: 'student',
    mark: '1185',
    percentage: '98%',
    year: '2019'
  },
  {
    class_id: 'PRE2209',
    id: 3,
    fullName: 'Jimmy',
    className: '10A',
    mobile: '097 3584 5870',
    address: '911 Deer Ridge Drive,USA',
    role: 'student',
    mark: '1185',
    percentage: '98%',
    year: '2019'
  },
  {
    class_id: 'PRE2209',
    id: 4,
    fullName: 'John Smith',
    className: '10A',
    mobile: '097 3584 5870',
    address: '911 Deer Ridge Drive,USA',
    role: 'student',
    mark: '1185',
    percentage: '98%',
    year: '2019'
  },
  {
    class_id: 'PRE2209',
    id: 5,
    fullName: 'jack',
    className: '10A',
    mobile: '097 3584 5870',
    address: '911 Deer Ridge Drive,USA',
    role: 'student',
    mark: '1185',
    percentage: '98%',
    year: '2019'
  }
]
const cardMock = [
  {
    id: 1,
    color: 'card bg-one w-100',
    iconClass: 'fas fa-admin-graduate',
    number: '50055',
    type: 'Students'
  },
  {
    id: 2,
    color: 'card bg-two w-100',
    iconClass: 'fas fa-crown',
    number: '50+',
    type: 'Awards'
  },
  {
    id: 3,
    color: 'card bg-three w-100',
    iconClass: 'fas fa-building',
    number: '30+',
    type: 'Department'
  },
  {
    id: 4,
    color: 'card bg-four w-100',
    iconClass: 'fas fa-file-invoice-dollar',
    number: '$505',
    type: 'Revenue'
  }
]
const Dashboard = () => {
  const prePage = ''

  return (
    <>
      <HeaderContent
        pageTitle={'Welcome Admin!'}
        pageName={'Dashboard'}
        prePage={prePage}
      />
      <div className="row">
        {cardMock.map((card) => (
          <CardStatic
            color={card.color}
            iconClass={card.iconClass}
            number={card.number}
            type={card.type}
            key={card.id}
          />
        ))}
      </div>

      <div className="row">
        <div className="col-md-12 col-lg-6">
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-6">
                  <h5 className="card-title">Revenue</h5>
                </div>
                <div className="col-6">
                  <ul className="list-inline-group text-right mb-0 pl-0">
                    <li className="list-inline-item">
                      <div className="form-group mb-0 amount-spent-select">
                        <select className="form-control form-control-sm">
                          <option>Today</option>
                          <option>Last Week</option>
                          <option>Last Month</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div id="apexcharts-area" />
            </div>
          </div>
        </div>
        <div className="col-md-12 col-lg-6">
          <div className="card card-chart">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col-6">
                  <h5 className="card-title">Number of Students</h5>
                </div>
                <div className="col-6">
                  <ul className="list-inline-group text-right mb-0 pl-0">
                    <li className="list-inline-item">
                      <div className="form-group mb-0 amount-spent-select">
                        <select className="form-control form-control-sm">
                          <option>Today</option>
                          <option>Last Week</option>
                          <option>Last Month</option>
                        </select>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div id="bar" />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title">Star Students</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover table-center">
                  <thead className="thead-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th className="text-center">Marks</th>
                      <th className="text-center">Percentage</th>
                      <th className="text-right">Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {starStudent.map((element) => (
                      <TableRow
                        id={element.id}
                        fullName={element.fullName}
                        mark={element.mark}
                        percentage={element.percentage}
                        year={element.year}
                        key={element.id}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <h5 className="card-title">Student Activity</h5>
            </div>
            <div className="card-body">
              <ul className="activity-feed">
                <li className="feed-item">
                  <div className="feed-date">Apr 13</div>
                  <span className="feed-text">
                    <a>John Doe</a> won 1st place in <a>Chess</a>
                  </span>
                </li>
                <li className="feed-item">
                  <div className="feed-date">Mar 21</div>
                  <span className="feed-text">
                    <a>Justin Lee</a> participated in{' '}
                    <a href="invoice.html">Carrom</a>
                  </span>
                </li>
                <li className="feed-item">
                  <div className="feed-date">Feb 2</div>
                  <span className="feed-text">
                    <a>Justin Lee</a>attended internation conference in{' '}
                    <a href="profile.html">St.John School</a>
                  </span>
                </li>
                <li className="feed-item">
                  <div className="feed-date">Apr 13</div>
                  <span className="feed-text">
                    <a>John Doe</a> won 1st place in <a>Chess</a>
                  </span>
                </li>
                <li className="feed-item">
                  <div className="feed-date">Mar 21</div>
                  <span className="feed-text">
                    <a>Justin Lee</a> participated in{' '}
                    <a href="invoice.html">Carrom</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
