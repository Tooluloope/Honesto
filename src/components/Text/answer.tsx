import React from 'react'
import { Skipped } from '../Skipped/index'
import { Text } from '@chakra-ui/react'

export const TextAnswer = ({ answer }: { answer?: string }) => {
  if (!answer) return <Skipped />

  return (
    <Text fontSize="14px" fontWeight="600">
      {answer}
    </Text>
  )
}
