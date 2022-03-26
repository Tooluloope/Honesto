import { Button, Flex, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IQuestionContainer } from '../QuestionContainer'

const MAX_SCALE = 10
export const Scale = ({ question, update, answer }: IQuestionContainer) => {
  const [value, setValue] = useState((answer[question.id] as number) - 1)
  const [current, setCurrent] = useState(value)
  const { colorMode } = useColorMode()

  const handleMouseEnter = (index: number) => {
    setCurrent(index)
  }

  const reset = () => {
    setCurrent(value)
  }
  const handleClick = (index: number) => {
    setValue(index)
    setCurrent(index)
    // index starts from Zero
    update(index + 1)
  }
  const background = colorMode === 'light' ? '#F2F3F4' : '#2d3748'

  return (
    <Flex flex={2} justifyContent="center" align="center">
      <Flex>
        {new Array(MAX_SCALE).fill(0).map((_, index) => (
          <Button
            onMouseEnter={() => handleMouseEnter(index)}
            onClick={() => handleClick(index)}
            _hover={{
              background: '#AB61E5',
            }}
            _focus={{
              background: '#AB61E5',
            }}
            _active={{
              background: '#AB61E5',
            }}
            onMouseLeave={() => reset()}
            key={index}
            mx="2px"
            w="74px"
            h="74px"
            bg="#F2F3F4"
            border="2px solid rgba(255, 255, 255, 0.16)"
            background={`${index <= current ? '#AB61E5' : background}`}
          />
        ))}
      </Flex>
    </Flex>
  )
}
