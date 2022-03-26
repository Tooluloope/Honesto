import React from 'react'
import { Skipped } from '../Skipped/index'
import { Box, Flex, useColorMode } from '@chakra-ui/react'
import { isNil } from 'lodash'

const MAX_SCALE = 10
export const ScaleAnswer = ({ answer }: { answer?: number }) => {
  const { colorMode } = useColorMode()

  if (isNil(answer)) return <Skipped />
  const background = colorMode === 'light' ? '#F2F3F4' : '#2d3748'

  return (
    <Flex flex={2} justifyContent="center" align="start">
      <Flex flex={2}>
        {new Array(MAX_SCALE).fill(0).map((_, index) => (
          <Box
            key={index}
            w="33px"
            mx="2px"
            h="33px"
            bg="#F2F3F4"
            border="2px solid rgba(255, 255, 255, 0.16)"
            background={`${index < answer ? '#AB61E5' : background}`}
          />
        ))}
      </Flex>
    </Flex>
  )
}
