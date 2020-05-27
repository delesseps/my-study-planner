import {AxiosResponse, AxiosRequestConfig} from 'axios'

import {agent} from 'utils'
import IUser from 'constants/interfaces/IUser'
import ISignInCredentials from 'constants/interfaces/ISignInCredentials'
import ISignUpCredentials from 'constants/interfaces/ISignUpCredentials'

export function getUser(): Promise<IUser> {
  const options: AxiosRequestConfig = {
    url: '/user/current',
    method: 'get',
  }

  return agent.request(options).then(({data}) => data.user)
}

export function login({
  email,
  password,
  remember,
}: ISignInCredentials): Promise<IUser> {
  const options: AxiosRequestConfig = {
    url: '/auth/signin',
    method: 'post',
    data: {
      email,
      password,
      remember,
    },
  }

  return agent.request(options).then(({data}) => data.user)
}

export function logout(): Promise<AxiosResponse> {
  const options: AxiosRequestConfig = {
    url: '/user/signout',
    method: 'get',
  }

  return agent.request(options)
}

export function register({
  name,
  email,
  password,
}: ISignUpCredentials): Promise<IUser> {
  const options: AxiosRequestConfig = {
    url: '/auth/signup',
    method: 'post',
    data: {
      name,
      email,
      password,
    },
  }

  return agent.request(options).then(({data}) => data.user)
}

export function requestChangePassword(email: string): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/recover/password',
    method: 'post',
    data: {
      email,
    },
  }

  return agent.request(options).then(({data}) => data)
}

export function changePasswordTokenConfirmation(
  token: string,
): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/recover/password_token_confirmation',
    method: 'post',
    data: {
      token,
    },
  }

  return agent.request(options).then(({data}) => data)
}

export function changePassword({
  token,
  password,
}: {
  token: string
  password: string
}): Promise<string> {
  const options: AxiosRequestConfig = {
    url: '/recover/change_password',
    method: 'post',
    data: {
      password,
      token,
    },
  }

  return agent.request(options).then(({data}) => data)
}
