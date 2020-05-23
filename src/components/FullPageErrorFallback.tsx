import React from 'react'
import {AxiosError} from 'axios'
import {Result, Button} from 'antd'
import styled from 'styled-components'

interface Props {
  error?: Error
  requestError?: AxiosError
}

const errors: Record<string, string> = {
  401: 'Sorry, you are not authorized to do this operation.',
  500: 'Sorry, the server is down. The sadness...',
}

const FullPageErrorFallback = ({error, requestError}: Props) => {
  if (error) {
    return (
      <Styles.Result
        status={'error'}
        title={'Something Went Wrong'}
        subTitle={'A fatal error has ocurred. Please refresh.'}
        extra={
          <a href="/">
            <Button type="primary">Back Home</Button>
          </a>
        }
      />
    )
  }

  const errorCode = requestError?.response?.status as any

  return (
    <Styles.Result
      status={errorCode === 500 ? errorCode : 'error'}
      title={errorCode ? errorCode : 'Error'}
      subTitle={
        errors[errorCode]
          ? errors[errorCode]
          : 'A fatal error has ocurred. Please refresh.'
      }
      extra={
        <Button type="primary">
          <a href="/">Back Home</a>
        </Button>
      }
    />
  )
}

const Styles = {
  Result: styled(Result)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh;

    & > *:first-of-type {
      margin: 0 auto;
    }
  `,
}

export default FullPageErrorFallback
