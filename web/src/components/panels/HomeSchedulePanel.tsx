import React, {useEffect, useState} from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import {toTitleCase} from 'utils'
import {HomeworkDescription, EvaluationDescription} from 'components/modals'
import styled from 'styled-components'
import {breakpoints} from 'theme'

import IEvaluation from 'constants/interfaces/IEvaluation'
import IScheduleEvent from 'constants/interfaces/IScheduleEvent'
import {Urgency} from 'constants/interfaces/IUser'
import IHomework from 'constants/interfaces/IHomework'
import {useHomework} from 'features/homework/homework-hooks'
import {useEvaluations} from 'features/evaluation/evaluation-hooks'
import {useAuth} from 'features/auth/auth-context'

const localizer = momentLocalizer(moment)

function determineColor(urgency: Urgency, alpha = 1) {
  switch (urgency) {
    case 'chill':
      return `rgba(82, 196, 26, ${alpha})`
    case 'normal':
      return `rgba(250, 219, 20, ${alpha})`
    case 'important':
      return `rgba(245, 34, 45, ${alpha})`
    default:
  }
}

interface IHomeSchedulePanelProps {
  evaluations?: IEvaluation[]
  homework?: IHomework[]
}

const HomeSchedulePanel: React.FC<IHomeSchedulePanelProps> = () => {
  const [events, setEvents] = useState<IScheduleEvent[]>([])
  const {homework} = useHomework()
  const {evaluations} = useEvaluations()
  const {user} = useAuth()

  useEffect(() => {
    //Adds and normalizes evaluations which are not done to events
    const filteredEvaluations: IScheduleEvent[] = evaluations
      .filter(({done}) => !done.includes(user._id))
      .map(evaluation => ({
        title: `${toTitleCase(evaluation.evaluationType)}: ${
          evaluation.subject
        }`,
        start: new Date(evaluation.date),
        end: new Date(evaluation.date),
        allDay: true,
        urgency: evaluation.urgency,
        type: 'evaluation',
        evaluation,
      }))

    //Adds and normalizes homework which are not done to events
    const filteredHomework: IScheduleEvent[] = homework
      .filter(({done}) => !done.includes(user._id))
      .map(homework => ({
        title: 'HW: ' + homework.subject,
        start: new Date(homework.date),
        end: new Date(homework.date),
        allDay: true,
        urgency: homework.urgency,
        type: 'homework',
        homework: homework,
      }))

    setEvents([...filteredEvaluations, ...filteredHomework])
  }, [evaluations, homework, user._id])

  return (
    <StyledCalendar
      // @ts-ignore
      events={events}
      views={['week', 'day', 'agenda']}
      localizer={localizer}
      defaultView={'agenda'}
      onSelectEvent={(event: any) => {
        if (event.evaluation) EvaluationDescription(event.evaluation)

        if (event.homework) HomeworkDescription(event.homework)
      }}
      eventPropGetter={(event: any) => ({
        style: {
          backgroundColor: determineColor(event.urgency, 0.8),
          border: `2px solid ${determineColor(event.urgency)}`,
        },
      })}
    />
  )
}

const StyledCalendar = styled(Calendar)`
  @media only screen and (max-width: ${breakpoints.bpMobileL}) {
    .rbc-toolbar {
      flex-direction: column;

      & > *:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
`

export default HomeSchedulePanel
