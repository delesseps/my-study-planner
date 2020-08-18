import {Tabs} from 'antd'
import React from 'react'
import {useParams} from 'react-router'
import styled from 'styled-components'
import {
  SnippetsOutlined,
  CalculatorOutlined,
  UserOutlined,
} from '@ant-design/icons'

import {useCourse} from 'features/course/course-hooks'
import {hhmmss, getColorByText} from 'utils'
import {Weekdays} from 'constants/interfaces'
import {getLuminance} from 'polished'

interface Props {}

const CourseDetails = (props: Props) => {
  const {id} = useParams()
  const {status, data} = useCourse(id)

  // TODO: handle error when fetching
  // TODO: Show loading with skeleton

  if (status === 'loading' || !data) {
    return null
  }

  console.table(data)
  return (
    <Styles.Wrapper>
      <Styles.Main>
        <Details.Background bgColor={getColorByText({text: data.name})}>
          &nbsp;
        </Details.Background>
        <Details.Header bgColor={getColorByText({text: data.name})}>
          <Details.Title>{data.name}</Details.Title>
        </Details.Header>
        <Details.Body>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Activity" key="1">
              Activity
            </Tabs.TabPane>
            <Tabs.TabPane tab="Homework" key="2">
              Homework
            </Tabs.TabPane>
            <Tabs.TabPane tab="Evaluations" key="3">
              Evaluations
            </Tabs.TabPane>
          </Tabs>
        </Details.Body>
      </Styles.Main>

      <Styles.Aside>
        <Panel.Wrapper>
          <Panel.Header>
            <Panel.Title>Summary</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            <Feature.Wrapper>
              <Icon.Wrapper>
                <SnippetsOutlined style={{fontSize: '24px'}} />
                <Icon.Title>Homework</Icon.Title>
              </Icon.Wrapper>
              <Feature.Value>{data.homework.length}</Feature.Value>
            </Feature.Wrapper>

            <Feature.Wrapper>
              <Icon.Wrapper>
                <CalculatorOutlined style={{fontSize: '24px'}} />
                <Icon.Title>Evaluations</Icon.Title>
              </Icon.Wrapper>
              <Feature.Value>{data.evaluations.length}</Feature.Value>
            </Feature.Wrapper>

            <Feature.Wrapper>
              <Icon.Wrapper>
                <UserOutlined style={{fontSize: '24px'}} />
                <Icon.Title>Members</Icon.Title>
              </Icon.Wrapper>
              <Feature.Value>{data.members.length}</Feature.Value>
            </Feature.Wrapper>
          </Panel.Body>
        </Panel.Wrapper>

        <Panel.Wrapper>
          <Panel.Header>
            <Panel.Title>Members</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            {data.members.map(({_id, picture, name}) => {
              return (
                <User.Wrapper key={_id}>
                  <User.Picture src={picture} />
                  <User.Name>{name}</User.Name>
                </User.Wrapper>
              )
            })}
          </Panel.Body>
        </Panel.Wrapper>

        <Panel.Wrapper>
          <Panel.Header>
            <Panel.Title>Schedule</Panel.Title>
          </Panel.Header>
          <Panel.Body>
            {Object.keys(data.schedule).map(day => {
              const {start, end} = {
                start: data.schedule[day as Weekdays]!.start,
                end: data.schedule[day as Weekdays]!.end,
              }

              const startTime = hhmmss(start)
              const endTime = hhmmss(end)

              return (
                <Time.Wrapper key={day}>
                  <Time.Day>{day.toLowerCase()}</Time.Day>
                  <Time.TimeRange>
                    {startTime} - {endTime}
                  </Time.TimeRange>
                </Time.Wrapper>
              )
            })}
          </Panel.Body>
        </Panel.Wrapper>
      </Styles.Aside>
    </Styles.Wrapper>
  )
}

const Styles = {
  Wrapper: styled.section`
    display: flex;
    padding-top: 4rem;

    & > *:not(:last-child) {
      margin-right: 3rem;
    }
  `,
  Main: styled.section`
    flex: 1;

    min-height: 80vh;

    background-color: ${({theme}) => theme.panelBackgroundColor};
    box-shadow: ${({theme}) => theme.shadow1};
    border-radius: ${({theme}) => theme.borderRadius};
  `,
  Aside: styled.section`
    flex: 0 0 25%;

    & > *:not(:last-child) {
      margin-bottom: 3rem;
    }
  `,
}

const Details = {
  Background: styled.div<{bgColor: string}>`
    background-color: ${({bgColor}) => bgColor};
    border-top-left-radius: ${({theme}) => theme.borderRadius};
    border-top-right-radius: ${({theme}) => theme.borderRadius};

    height: 150px;
  `,
  Header: styled.header<{bgColor: string}>`
    color: ${({bgColor}) => {
      const luminance = getLuminance(bgColor)

      // Determine if text color should be black or white by its luminance
      if (luminance > Math.sqrt(1.05 * 0.05) - 0.05) return '#000'
      else return '#fff'
    }};

    padding: 0 2rem;
  `,
  Title: styled.p`
    font-size: 6rem;
    font-weight: 900;
    margin: 0;
  `,
  Body: styled.div`
    padding: 0 2rem;
  `,
}

const Panel = {
  Wrapper: styled.section`
    display: flex;
    flex-direction: column;

    background-color: ${({theme}) => theme.panelBackgroundColor};
    box-shadow: ${({theme}) => theme.shadow1};
    border-radius: ${({theme}) => theme.borderRadius};

    max-height: 60rem;
    overflow-y: auto;
  `,
  Header: styled.header`
    padding: 1rem 2rem;

    border-bottom: 1px solid ${props => props.theme.fontColors.textRgba(0.1)};
  `,
  Title: styled.h1`
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;

    color: ${props => props.theme.fontColors.textRgba(0.8)};
  `,
  Body: styled.div`
    padding: 1rem 2rem;
  `,
}

const Feature = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding-right: 1rem;
  `,
  Value: styled.p`
    font-size: 1.6rem;
    font-weight: 500;

    color: ${props => props.theme.fontColors.textRgba(0.8)};

    margin: 0;
  `,
}

const Icon = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    padding: 1.4rem 0;

    & > *:not(:last-child) {
      margin-right: 1rem;
    }

    svg {
      color: ${({theme}) => theme.colors.main};
    }
  `,
  Title: styled.p`
    font-size: 1.6rem;
    font-weight: 500;

    color: ${props => props.theme.fontColors.textRgba(0.8)};

    margin: 0;
  `,
}

const User = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    padding: 1rem 0;

    & > *:not(:last-child) {
      margin-right: 1.5rem;
    }
  `,
  Picture: styled.img`
    border-radius: 100%;

    max-width: 30px;
    min-width: 20px;
    height: auto;
  `,
  Name: styled.p`
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;
  `,
}

const Time = {
  Wrapper: styled.div`
    display: flex;
    align-items: center;

    padding: 1.4rem 0;

    & > *:not(:last-child) {
      margin-right: 2rem;
    }
  `,
  Day: styled.h2`
    font-size: 1.6rem;
    font-weight: 500;
    margin: 0;

    color: ${props => props.theme.fontColors.textRgba(0.8)};

    &::first-letter {
      text-transform: capitalize;
    }
  `,
  TimeRange: styled.p`
    font-size: 1.6rem;
    margin: 0;
  `,
}

export default CourseDetails
