import {
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Text,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { FeedbackT } from '../../context/FeedbackProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import { UserContext } from '../../context/UserProvider'
import { CustomTab } from '../TabButton'
import { QuestionAnswerPanel } from '../TabPanel/QuestionAnswerPanel'

interface ITab {
  userFeedbacks: FeedbackT[]
  team?: boolean
}

export const Tab = ({ userFeedbacks, team }: ITab) => {
  const users = React.useContext(UserContext)
  const [searchParams] = useSearchParams()
  const defaultUserId = searchParams.get('user')
  const { colorMode } = useColorMode()

  const getDefaultIndex = () => {
    if (!defaultUserId) return 0
    const persons = userFeedbacks.map((feedback, idx) => {
      const person = team ? feedback.from : feedback.to
      const uniqueUser = users?.find((user) => user.id === person)
      if (!uniqueUser) return null
      return uniqueUser
    })
    const index = persons.findIndex((person) => person?.id === defaultUserId)

    return index === -1 ? 0 : index
  }

  const questions = React.useContext(QuestionContext)
  const orientation = useBreakpointValue({
    base: 'horizontal',
    md: 'vertical',
  }) as 'horizontal' | 'vertical'
  const border = colorMode === 'light' ? '#D9DCDE' : '#ffffff29'

  return (
    <Tabs
      minH="817px"
      orientation={orientation}
      h="full"
      defaultIndex={getDefaultIndex()}
    >
      <TabList minW="380px" border="none">
        <Text
          color="#59636E"
          fontSize="12px"
          fontWeight="bold"
          py="15px"
          px="20px"
          borderBottom={`1px solid ${border}`}
        >
          FEEDBACK {team ? 'GIVEN' : 'RECEIVED'}
        </Text>
        {userFeedbacks.map((feedback, idx) => {
          const person = team ? feedback.from : feedback.to
          const uniqueUser = users?.find((user) => user.id === person)
          if (!uniqueUser) return null
          return <CustomTab key={idx} user={uniqueUser} />
        })}
      </TabList>

      <TabPanels borderLeft={`1px solid ${border}`} minH="817px" height="full">
        {userFeedbacks.map((feedback, idx) => {
          const person = team ? feedback.from : feedback.to
          const uniqueUser = users?.find((user) => user.id === person)

          const questionsWithAnswer = questions?.map((question) => {
            const answer = feedback.questions[question.id]
            return { ...question, answer }
          })

          return (
            <TabPanel px="0px" key={idx}>
              <Text px="20px" fontSize="22px" fontWeight="600">
                {uniqueUser?.name}'s Feedback
              </Text>
              {questionsWithAnswer?.map((qna, index) => (
                <QuestionAnswerPanel key={index} QnA={qna} />
              ))}
            </TabPanel>
          )
        })}
      </TabPanels>
    </Tabs>
  )
}
