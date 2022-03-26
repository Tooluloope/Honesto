import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'

export const NoFeedback = () => {
  return (
    <MainLayout loggedIn>
      <Box
        maxW="800px"
        mx="auto"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
        p="20px"
      >
        <Text fontWeight="600" fontSize="31px" py="15px">
          No feedback to display 🔮
        </Text>
        <Text fontWeight="normal" fontSize="16px" pb="15px" color="#59636E">
          There is no feedback to display at this time – check back in a bit!
        </Text>
      </Box>
    </MainLayout>
  )
}
