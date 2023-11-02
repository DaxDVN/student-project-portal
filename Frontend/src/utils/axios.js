import axios from 'axios'

const customFetch = axios.create({
  // baseURL: ' https://jobify-prod.herokuapp.com/api/v1/toolkit'
  baseURL: 'http://localhost:8080/api/'
})

export default customFetch
