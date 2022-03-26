import { Tag, TagLabel } from '@chakra-ui/react'
import React from 'react'

export const Skipped = () => {
  return (
    <Tag size="md" variant="solid" colorScheme="cyan">
      <TagLabel>SKIPPED</TagLabel>
    </Tag>
  )
}
