import React from 'react'
import { TextAnswer } from '../Text/answer'
import { MultiChoiceAnswer } from '../Multichoice/answer'
import { ScaleAnswer } from '../Scale/answer'
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react'
import { QuestionT } from '../../store/QuestionsSlice'

export interface IQuestionWithAnswer extends QuestionT {
  answer: string | number
}
export interface IQuestionPanel {
  QnA: IQuestionWithAnswer
}
export const QuestionAnswerPanel = ({ QnA }: IQuestionPanel) => {
  const { colorMode } = useColorMode()

  const border = colorMode === 'light' ? '#D9DCDE' : '#ffffff29'

  const getAnswer = () => {
    switch (QnA.type) {
      case 'text':
        return <TextAnswer answer={QnA.answer as string} />
      case 'multipleChoice':
        return <MultiChoiceAnswer QnA={QnA} />
      case 'scale':
        return <ScaleAnswer answer={QnA.answer as number} />
      default:
        return <div>Question Coming Soon</div>
    }
  }

  return (
    <Flex
      borderBottom={`1px solid ${border}`}
      py="30px"
      w="full"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box px="20px" flex="1 1 0px">
        <Text fontSize="14px" fontWeight="600">
          {QnA.label}
        </Text>
      </Box>
      <Box px="20px" flex="1 1 0px">
        {getAnswer()}
      </Box>
    </Flex>
  )
}
