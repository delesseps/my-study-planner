import React from 'react'
import styled from 'styled-components'
import {
  UserOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons'
import {Badge, Avatar, Divider, Popconfirm, Tooltip} from 'antd'
import moment from 'moment'
import {useToggle} from 'react-use'

import {setDate, determinePriority, determineColor, isDictionary} from 'utils'
import IHomework from 'constants/interfaces/IHomework'
import HomeworkDescriptionModal from 'components/modals/HomeworkDescription'
import {
  useHomework,
  useHomeworkMarkAsDone,
} from 'features/homework/homework-hooks'

const HomeworkDrawer = React.lazy(() =>
  import('components/drawers/HomeworkDrawer'),
)

interface IHomeworkCardProps {
  homework: IHomework
  index: number
}

const HomeworkCard: React.FunctionComponent<IHomeworkCardProps> = ({
  homework,
  index,
}) => {
  const [openDrawer, toggleDrawer] = useToggle(false)
  const {
    remove: [removeMutate],
  } = useHomework()

  const [markHomeworkAsDone] = useHomeworkMarkAsDone()

  const handleViewMoreClick = () => {
    HomeworkDescriptionModal(homework)
  }

  const handleEditClick = () => {
    toggleDrawer(true)
  }

  const handleDeleteClick = () => {
    removeMutate({id: homework._id, index})
  }

  const handleDoneClick = () => {
    markHomeworkAsDone({homeworkId: homework._id, index})
  }

  return (
    <Wrapper>
      <HomeworkDrawer
        visible={openDrawer}
        setVisible={toggleDrawer}
        homework={homework}
        index={index}
      />
      <MainInfo>
        <Assignment>
          <AssignmentTitle>{homework.name}</AssignmentTitle>
          <AssignmentCourse>
            {isDictionary(homework.course.details)
              ? homework.course.details!.name
              : homework.course.name}
          </AssignmentCourse>
          <AssignmentPriority>
            <Badge color={determineColor(homework.urgency)} />
            {determinePriority(homework.urgency)}
          </AssignmentPriority>
        </Assignment>
        <Actions>
          <Action aria-label="Mark evaluation as done">
            <Tooltip title="Done" mouseEnterDelay={0.4}>
              <CheckIcon onClick={handleDoneClick} />
            </Tooltip>
          </Action>

          <Action aria-label="Open edit homework drawer">
            <Tooltip title="Edit" mouseEnterDelay={0.4}>
              <EditIcon onClick={handleEditClick} />
            </Tooltip>
          </Action>

          <Action aria-label="Delete Homework">
            <Popconfirm
              title="Are you sure to delete this homework?"
              arrowPointAtCenter={true}
              placement="topRight"
              okText="Yes"
              cancelText="No"
              onConfirm={handleDeleteClick}
            >
              <Tooltip title="Delete" mouseEnterDelay={1}>
                <DeleteIcon />
              </Tooltip>
            </Popconfirm>
          </Action>
        </Actions>
      </MainInfo>
      <OtherInfo>
        <User>
          <Avatar
            size={30}
            icon={<UserOutlined />}
            src={homework.createdBy.picture}
          />
          <UserName>{homework.createdBy.name}</UserName>
        </User>
        <Date>
          <ClockIcon />
          <span>{setDate(moment(homework.date))}</span>
          <Divider type="vertical" />
          <ViewMore onClick={handleViewMoreClick}> View More</ViewMore>
        </Date>
      </OtherInfo>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0.8rem 2rem;
  border: 0.7px solid ${props => props.theme.fontColors.textRgba(0.15)};
  border-radius: 5px;

  display: flex;
  flex-direction: column;

  height: 16rem;
  width: 100%;

  justify-content: space-between;
`

const MainInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const Assignment = styled.div`
  display: flex;
  flex-direction: column;
`

const AssignmentTitle = styled.h1`
  letter-spacing: 0.5px;
  font-weight: 500;
  font-size: 1.7rem;
  margin: 0;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`

const AssignmentCourse = styled.h3`
  letter-spacing: 0.5px;
  font-weight: 900;
  font-size: 1.2rem;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
`

const AssignmentPriority = styled.p`
  display: flex;
  align-items: center;
  color: ${props => props.theme.fontColors.textRgba(0.5)};
  margin: 0;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:last-child) {
    margin-right: 1.5rem;
  }
`

const Action = styled.button`
  border: none;
  background: transparent;

  outline: none;
`

const CheckIcon = styled(CheckOutlined)`
  cursor: pointer;
  font-size: 1.9rem;
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme.colors.main};
  }
`
const EditIcon = styled(EditOutlined)`
  cursor: pointer;
  font-size: 1.9rem;
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme.colors.main};
  }
`
const DeleteIcon = styled(DeleteOutlined)`
  cursor: pointer;
  font-size: 1.9rem;
  transition: 0.1s;

  &:hover {
    color: ${props => props.theme.colors.main};
  }
`

const OtherInfo = styled.div`
  display: flex;
  justify-content: space-between;
`

const User = styled.div`
  display: flex;
  align-items: center;
`

const UserName = styled.h5`
  letter-spacing: 1px;
  display: flex;
  font-weight: bold;
  font-size: 1.2rem;
  align-items: center;
  color: ${props => props.theme.fontColors.textRgba(0.6)};
  margin: 0;
  margin-left: 0.7rem;
`

const Date = styled.div`
  letter-spacing: 1px;
  display: flex;
  font-weight: 400;
  font-size: 1.328rem;
  align-items: center;
  color: ${props => props.theme.fontColors.textRgba(0.8)};
  margin: 0;
`

const ClockIcon = styled(ClockCircleOutlined)`
  font-size: 2rem;
  margin-right: 0.7rem;
`

const ViewMore = styled.span`
  cursor: pointer;
  color: ${props => props.theme.colors.main};
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`

export default HomeworkCard
