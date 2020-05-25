import React from 'react'
import userEvent from '@testing-library/user-event'
import {Form} from 'antd'

import {render, mockAxios, screen} from 'test/test-utils'
import {CourseAutocomplete} from 'components'
import {buildCourse} from 'test/generate'

function TestComponent() {
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <Form.Item
        name="subject"
        rules={[
          {
            required: true,
            message: 'Please input the course name!',
            whitespace: true,
          },
        ]}
        label={<span>Course name</span>}
      >
        <CourseAutocomplete />
      </Form.Item>
    </Form>
  )
}

describe('CourseAutoComplete', () => {
  test('renders, displays courses options and can filter through them', async () => {
    const courses = [buildCourse(), buildCourse(), buildCourse()]
    mockAxios.onGet('/course').reply(200, {course: courses})

    render(<TestComponent />)

    userEvent.click(screen.getByLabelText(/course name/i))

    await screen.findByText(/my courses/i)
    await screen.findByText(courses[0].name)
    await screen.findByText(courses[1].name)
    await screen.findByText(courses[2].name)

    userEvent.type(screen.getByLabelText(/course name/i), courses[0].name)
    expect(screen.queryByText(courses[1].name)).toBeNull()
    expect(screen.queryByText(courses[2].name)).toBeNull()
  })
})
