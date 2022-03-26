import * as React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Box, Text, Flex } from '@chakra-ui/react'
import { NoFeedback } from '../../components/NoFeedback'

import { Tab } from '../../components/Tab'
import { useAppSelector } from '../../store/hooks'

const TeamFeedback = () => {
  const feedbacks = useAppSelector((state) => state.feedbacks.feedbacks)
  const { account } = useAppSelector((state) => state.account)
  const userFeedbacks = feedbacks.filter(
    (feedback) => feedback.to === account?.id,
  )

  if (!userFeedbacks || userFeedbacks.length === 0) return <NoFeedback />

  return (
    <MainLayout loggedIn>
      <Box maxW="1200px" mx="auto">
        <Text fontWeight="600" fontSize="31px" py="15px">
          Team Feedback
        </Text>

        <Flex
          w="full"
          minH="817px"
          h="full"
          boxShadow="0px 0px 4px rgba(0, 0, 0, 0.25)"
        >
          <Tab userFeedbacks={userFeedbacks} team />
        </Flex>
      </Box>
    </MainLayout>
  )
}

export default TeamFeedback
