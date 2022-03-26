import { VStack, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IQuestionContainer } from '../QuestionContainer'

export const MultiChoice = ({
  question,
  update,
  answer,
}: IQuestionContainer) => {
  const [value, setValue] = useState<number | null>(
    answer[question.id] as number,
  )

  const handleClick = (selectedValue: number) => {
    setValue(selectedValue)
    update(selectedValue)
  }
  return (
    <VStack flex={2} justifyContent="center">
      {question.options?.map((option) => (
        <Button
          key={option.value}
          justifyContent="start"
          _hover={{
            background: '#59636E',
            color: 'white',
          }}
          _focus={{
            background: '#59636E',
            color: 'white',
          }}
          _active={{
            background: '#59636E',
            color: 'white',
          }}
          p="20px"
          height="auto"
          w="full"
          whiteSpace="pre-wrap"
          textAlign="left"
          lineHeight="22px"
          fontSize="16px"
          color={`${value === option.value ? 'white' : '#031323'}`}
          background={`${value === option.value ? '#59636E' : '#F2F3F4'}`}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </VStack>
  )
}
