import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import User from '../User'
import styles from './index.module.css'
import { Box, useColorMode } from '@chakra-ui/react'
import { useAppSelector } from '../../store/hooks'

interface IEmployeeList {
  isConfirmation?: boolean
}
export const EmployeeList = ({ isConfirmation }: IEmployeeList) => {
  const { users, usersLoading, usersError } = useAppSelector(
    (state) => state.users,
  )
  const { account } = useAppSelector((state) => state.account)
  const feedbacks = useAppSelector((state) => state.feedbacks.feedbacks)
  const { colorMode: mode } = useColorMode()
  const navigate = useNavigate()

  return (
    <>
      {users && users.length > 0 && (
        <Box as="ul" className={styles.users}>
          {users.map((user) => {
            const hasFeedBack = feedbacks.find(
              ({ to, from }) => to === user.id && from === account?.id,
            )

            if (user.id === account?.id) return null
            if (isConfirmation && hasFeedBack) {
              return null
            }
            return (
              <Box
                as="li"
                _hover={{
                  background: mode === 'dark' ? 'rgb(45, 55, 72)' : '#faf5ff',
                }}
                key={user.id}
                className={styles.user}
              >
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                {hasFeedBack ? (
                  <Button
                    onClick={() => {
                      navigate(`/my-feedback?user=${user.id}`)
                    }}
                  >
                    View Submission
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      navigate(`/share-feedback/${user.id}/questions`)
                    }}
                  >
                    Fill out
                  </Button>
                )}
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}
