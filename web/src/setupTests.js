import {queryCache} from 'react-query'
import 'babel-polyfill'
import '@testing-library/jest-dom/extend-expect'

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = 15000

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

Object.defineProperty(document, 'cookie', {
  writable: true,
  value: '',
})

Object.defineProperty(window, 'less', {
  writable: true,
  value: {
    modifyVars: jest.fn(),
  },
})

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  jest.spyOn(console, 'warn').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
  console.warn.mockRestore()
})

afterEach(() => {
  queryCache.clear()
  jest.clearAllMocks()
})
