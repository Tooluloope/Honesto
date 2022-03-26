import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { ModeToggle } from '../../components/ModeToggle'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { logout } from '../../store/AccountSlice'

const Header = () => {
  const { account: currentUser } = useAppSelector((state) => state.account)
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Box className={styles.header}>
      <h1>Honesto</h1>
      <NavLink
        end
        to="/share-feedback"
        className={({ isActive }) => `${isActive ? styles.active : ''}`}
      >
        Share Feedback
      </NavLink>
      <NavLink
        end
        to="/my-feedback"
        className={({ isActive }) => `${isActive ? styles.active : ''}`}
      >
        My Feedback
      </NavLink>
      <NavLink
        end
        to="/team-feedback"
        className={({ isActive }) => `${isActive ? styles.active : ''}`}
      >
        Team Feedback
      </NavLink>
      <span className={styles.spacer} />
      <ModeToggle />

      <NavLink end to="/" onClick={handleLogout}>
        <Flex justify="space-between" align="center">
          <Image
            src={currentUser?.avatarUrl}
            alt={currentUser?.name}
            w="58px"
            h="58px"
            borderRadius="full"
          />
          <Box px="20px">
            <Text py="5px" fontSize="16px">
              {currentUser && `${currentUser.name}`}
            </Text>
            <Text fontSize="12px" fontWeight="bold">
              Logout
            </Text>
          </Box>
        </Flex>
      </NavLink>
    </Box>
  )
}
export default Header
