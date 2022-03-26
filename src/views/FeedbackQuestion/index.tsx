import {
  Box,
  Flex,
  Image,
  Link,
  Progress,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, { useMemo, useState } from 'react'
import { isNil, isString } from 'lodash'
import MainLayout from '../../layouts/MainLayout'
import { useParams, Link as RouteLink, Navigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { QuestionContainer } from '../../components/QuestionContainer'
import Button from '../../components/Button'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { addFeedback } from '../../store/FeedbackSlice'

export interface IAnswer {
  [x: string]: string | number
}

const FeedBackQuestions = () => {
  const { questions, questionsLoading, questionsError } = useAppSelector(
    (state) => state.questions,
  )
  const feedbacks = useAppSelector((state) => state.feedbacks.feedbacks)
  const dispatch = useAppDispatch()
  const { account: currentUser } = useAppSelector((state) => state.account)

  const {
    users: employees,
    usersError,
    usersLoading,
  } = useAppSelector((state) => state.users)
  const [answer, setAnswer] = useState<IAnswer>({})
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  let { employeeId } = useParams<'employeeId'>()
  const employee = employees?.find((user) => user.id === employeeId)
  const toast = useToast()

  const isRequired = useMemo(() => {
    if (!questions) return false
    const question = questions[currentQuestionIdx]
    return question.required
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIdx, JSON.stringify(questions)])

  const previousAnswers = feedbacks.find(
    (feedback) =>
      feedback.from === currentUser?.id && feedback.to === employeeId,
  )
  if (previousAnswers) return <Navigate to="/share-feedback/successful" />
  if (!employee) return <Navigate to="/share-feedback" />
  // TODO: Implement Loading state
  if (!questions) return <Box>Questions are loading</Box>

  const handleNext = () => {
    const question = questions[currentQuestionIdx]
    const textAnswer = answer[question.id]
    const isEmptyString = isString(textAnswer) && textAnswer.length === 0

    if (isRequired && (isEmptyString || isNil(textAnswer))) {
      toast({
        title: 'Error',
        description: 'Questions is required to be filled',
        status: 'error',
        isClosable: true,
      })
      return
    }

    if (
      currentQuestionIdx + 1 === questions.length &&
      currentUser !== null &&
      employeeId
    ) {
      dispatch(
        addFeedback({
          questions: answer,
          from: currentUser.id,
          to: employeeId,
        }),
      )

      return <Navigate to="/share-feedback/successful" />
    }

    setCurrentQuestionIdx((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (currentQuestionIdx === 0) return

    setCurrentQuestionIdx((prev) => prev - 1)
  }

  const updateAnswer = (value: string | number) => {
    const question = questions[currentQuestionIdx]

    setAnswer((prev) => ({ ...prev, [question.id]: value }))
  }

  return (
    <MainLayout loggedIn>
      <Flex
        maxW={'800px'}
        w="full"
        height="full"
        mx="auto"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="full">
          <Link as={RouteLink} to="/share-feedback">
            <ChevronLeftIcon w={8} h={8} /> Back
          </Link>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontWeight="600" fontSize="31px" py="15px">
                {questions[currentQuestionIdx].label}
              </Text>
              <Text fontWeight="bold" fontSize="12px" textTransform="uppercase">
                share your feedback for {employee.name}
              </Text>
            </Box>

            <Image
              src={employee.avatarUrl}
              alt={employee.name}
              w="58px"
              h="58px"
              borderRadius="full"
            />
          </Flex>

          <Flex
            w="full"
            my="20px"
            p="20px"
            minH="555px"
            boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
            flexDirection="column"
          >
            <QuestionContainer
              question={questions[currentQuestionIdx]}
              update={updateAnswer}
              answer={answer}
            />
            <Flex my="20px" justifyContent="space-between" alignItems="center">
              <Button
                secondary
                onClick={handlePrev}
                disabled={currentQuestionIdx === 0}
              >
                Previous
              </Button>

              {!isRequired && (
                <Button secondary onClick={handleNext}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>Next</Button>
            </Flex>
            <Progress
              my="20px"
              colorScheme="green"
              size="sm"
              value={currentQuestionIdx + 1}
              max={questions?.length}
            />
            <Box>
              <Text
                fontWeight="bold"
                fontSize="12px"
                py="15px"
                textTransform="uppercase"
              >
                Questions Completed
              </Text>
              <Text
                fontWeight="normal"
                fontSize="16px"
                textTransform="uppercase"
              >
                {currentQuestionIdx + 1}/{questions?.length}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </MainLayout>
  )
}

export default FeedBackQuestions
