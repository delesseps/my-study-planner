import {AxiosRequestConfig} from 'axios'
import {agent} from 'utils'

export function googleTokenConfirmation(token: string): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/link_account/confirm_token_google',
    method: 'post',
    data: {
      token,
    },
  }

  return agent.request(options).then(({data}) => data)
}

export function googleAccountLink({
  token,
  email,
}: {
  token: string
  email: string
}): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/link_account/google',
    method: 'post',
    data: {
      token,
      email,
    },
  }

  return agent.request(options).then(({data}) => data)
}
