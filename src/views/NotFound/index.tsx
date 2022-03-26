import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'

const NotFound = () => {
  const handleClick = () => {
    return <Navigate to="/share-feedback" />
  }
  return (
    <MainLayout loggedIn>
      <Box
        maxW="800px"
        mx="auto"
        boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
        p="20px"
      >
        <Text fontWeight="normal" fontSize="16px" pb="15px" color="#59636E">
          404
        </Text>
        <Text fontWeight="600" fontSize="31px" py="15px">
          Sorry! The page you are looking for cannot be found. 😢
        </Text>
        <Button onClick={handleClick}>Back to Share Feedback</Button>
      </Box>
    </MainLayout>
  )
}

export default NotFound
