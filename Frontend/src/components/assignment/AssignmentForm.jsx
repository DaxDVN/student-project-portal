import React, { useEffect, useState } from 'react'
import customFetch from '../../utils/axios.js'

const AssignmentForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    creatorId: 3
  })
  // const [editID, setEditID] = useState()
  const [data, setData] = useState([])

  const [subjects, setSubjects] = useState([])

  const { title, description, subjectId } = formData
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    // eslint-disable-next-line no-constant-condition
    if (true) {
      console.log(formData)
      customFetch
        .post('http://localhost:8080/api/assignments', formData)
        .then((res) => {
          setData([...data, res.data])
          setFormData({
            title: '',
            description: '',
            subject: '',
            creator: ''
          })
          console.log(formData)
        })
        .catch((err) => console.log(err))
    }
    window.location.href = '/assignments'
  }
  useEffect(() => {
    customFetch
      .get('http://localhost:8080/api/subjects')
      .then((res) => {
        console.log(res.data.content)
        setSubjects(res.data.content)
      })
      .catch((err) => console.log(err))

    // customFetch.get('http://localhost:8080/api/assignments')
    //   .then(res => {
    //     setData(res.data)
    //   })
    //   .catch(err => console.log(err))
  }, [])

  // console.log("subjects: " + subjects);
  return (
    <>
      <form>
        <div className="row">
          <div className="col-12">
            <h5 className="form-title">
              <span> New Assignment</span>
            </h5>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label> Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label>Subject</label>
              <select
                className="form-control"
                name="subjectId"
                value={subjectId}
                onChange={handleChange}
              >
                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.code + ' | ' + subject.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="form-group">
              <label>Description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                value={description}
                style={{ height: '50px' }}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="col-12 col-sm-6">
            <div className="form-group">
              <label>Creator</label>
              <select
                className="form-control"
                name="creatorId"
                value={creatorId}
                onChange={handleChange}
              >
                <option></option>
                <option>1</option>
                <option>NangNTH</option>
                <option>KienPT</option>
              </select>
            </div>
          </div> */}

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AssignmentForm
