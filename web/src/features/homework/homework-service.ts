import {agent} from 'utils'
import {AxiosRequestConfig} from 'axios'
import IHomework from 'constants/interfaces/IHomework'

export function remove({
  id,
  index,
}: {
  id: string
  index: number
}): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/homework/delete',
    method: 'delete',
    data: {
      _id: id,
    },
  }

  return agent.request(options).then(({data}) => data)
}

export function markAsDone({
  homeworkId,
  index,
}: {
  homeworkId: string
  index?: number
}): Promise<IHomework> {
  const options: AxiosRequestConfig = {
    url: '/homework/done',
    method: 'post',
    data: {
      id: homeworkId,
    },
  }

  return agent.request(options).then(({data}) => data.homework)
}

export function edit({
  homework,
  index,
}: {
  homework: IHomework
  index?: number
}): Promise<IHomework> {
  const options: AxiosRequestConfig = {
    url: '/homework/update',
    method: 'patch',
    data: homework,
  }

  return agent.request(options).then(({data}) => data.homework)
}

export function add(homework: IHomework): Promise<IHomework> {
  const options: AxiosRequestConfig = {
    url: '/homework/add',
    method: 'post',
    data: homework,
  }

  return agent.request(options).then(({data}) => data.homework)
}
