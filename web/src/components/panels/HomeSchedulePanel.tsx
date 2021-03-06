import React, {useEffect, useState} from 'react'
import BigCalendar from 'react-big-calendar'
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

const localizer = BigCalendar.momentLocalizer(moment)

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

  useEffect(() => {
    //Adds and normalizes evaluations which are not done to events
    const filteredEvaluations: IScheduleEvent[] = evaluations
      .filter(evaluation => !evaluation.done)
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
      .filter(currHomework => !currHomework.done)
      .map(currHomework => ({
        title: 'HW: ' + currHomework.subject,
        start: new Date(currHomework.date),
        end: new Date(currHomework.date),
        allDay: true,
        urgency: currHomework.urgency,
        type: 'homework',
        homework: currHomework,
      }))

    setEvents([...filteredEvaluations, ...filteredHomework])
  }, [evaluations, homework])

  return (
    <StyledBigCalendar
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

const StyledBigCalendar = styled(BigCalendar)`
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
