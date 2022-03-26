import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import * as React from 'react'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'

import { Box, Flex, Image, Text } from '@chakra-ui/react'
import { ModeToggle } from '../../components/ModeToggle'

const Header = () => {
  const currentUser = React.useContext(AccountContext)
  const logoutUser = React.useContext(DispatchAccountContext)

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
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
