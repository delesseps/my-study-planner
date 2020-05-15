import {agent} from 'utils'
import {AxiosRequestConfig} from 'axios'
import {ICourse} from 'constants/interfaces'

export function get(): Promise<ICourse[]> {
  const options: AxiosRequestConfig = {
    url: '/course',
    method: 'get',
  }

  return agent.request(options).then(({data}) => data.course)
}

export function getById(
  key: string,
  {courseId}: {courseId: string},
): Promise<ICourse> {
  const options: AxiosRequestConfig = {
    url: `/course/${courseId}`,
    method: 'get',
  }

  return agent.request(options).then(({data}) => data.course)
}

export function add(course: Partial<ICourse>): Promise<ICourse> {
  const options: AxiosRequestConfig = {
    url: `/course/add`,
    method: 'post',
    data: course,
  }

  return agent.request(options).then(({data}) => data.course)
}

export function remove({
  id,
  index,
}: {
  id: string
  index: number
}): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/course/delete',
    method: 'delete',
    data: {
      _id: id,
    },
  }

  return agent.request(options).then(({data}) => data)
}

export function edit({
  course,
  index,
}: {
  course: ICourse
  index?: number
}): Promise<ICourse> {
  const options: AxiosRequestConfig = {
    url: '/course/update',
    method: 'patch',
    data: course,
  }

  return agent.request(options).then(({data}) => data.course)
}
