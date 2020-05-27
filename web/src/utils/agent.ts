import axios from 'axios'
import {message} from 'antd'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  timeout: 10000,
})

instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.message === 'Network Error') {
      message.error('Unable to connect to server. Retrying...')
    }

    return Promise.reject(error)
  },
)

axios.defaults.withCredentials = true

export default instance
