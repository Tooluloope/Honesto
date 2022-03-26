import { Box, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IQuestionContainer } from '../QuestionContainer'

export const TextChoice = ({
  question,
  update,
  answer,
}: IQuestionContainer) => {
  const [value, setValue] = useState(answer[question.id] as string)

  useEffect(() => {
    const timeOutId = setTimeout(() => update(value), 400)
    return () => {
      if (answer[question.id] !== value) {
        update(value)
      }
      clearTimeout(timeOutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, question.id])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }
  return (
    <Box flex={2}>
      <Textarea
        onChange={handleChange}
        width="full"
        height="full"
        minH="315px"
        value={value}
        placeholder="say something"
      />
    </Box>
  )
}
