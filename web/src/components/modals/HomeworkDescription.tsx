import React from 'react'
import styled from 'styled-components'
import IHomework from 'constants/interfaces/IHomework'
import {ClockCircleOutlined} from '@ant-design/icons'
import {Modal} from 'antd'
import {setDate} from 'utils'
import moment from 'moment'

const HomeworkDescriptionModal = (homework: IHomework) => {
  if (!homework.description) homework.description = '' //Check if description is null and reassign it as an empty string

  Modal.info({
    width: 450,
    title: (
      <ModalTitleWrapper>
        <ModalTitle>{homework.name}</ModalTitle>
        <ModalTime>
          <ClockIcon />
          {setDate(moment(homework.date))}
        </ModalTime>
      </ModalTitleWrapper>
    ),
    content: (
      <ModalContent>
        Description: <br />
        {homework.description.length === 0 ? (
          <em>No Description</em>
        ) : (
          homework.description
        )}
      </ModalContent>
    ),
    onOk() {},
  })
}

const ModalTime = styled.h5`
  display: flex;
  font-weight: 400;
  align-items: center;

  margin: 0;
`

const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ModalTitle = styled.h3`
  letter-spacing: 0.5px;
  margin: 0;
  font-weight: 500;
  font-size: 1.7rem;

  width: 26rem;
  word-wrap: break-word;
`

const ModalContent = styled.p`
  margin-top: 1.3rem;
  line-height: 3rem;
`

const ClockIcon = styled(ClockCircleOutlined)`
  font-size: 2rem;
  margin-right: 0.7rem;
`

export default HomeworkDescriptionModal
