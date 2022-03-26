import React from 'react'
import { Skipped } from '../Skipped/index'
import { Text } from '@chakra-ui/react'
import { IQuestionPanel } from '../TabPanel/QuestionAnswerPanel'
import { isNil } from 'lodash'

export const MultiChoiceAnswer = ({ QnA }: IQuestionPanel) => {
  if (isNil(QnA.answer)) return <Skipped />

  const answer = QnA.options?.find(
    (option) => option.value === (QnA.answer as number),
  )

  return (
    <Text fontSize="14px" fontWeight="600">
      {answer?.label}
    </Text>
  )
}
