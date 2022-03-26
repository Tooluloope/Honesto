import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './index.module.css'
import { EmployeeList } from '../../components/EmployeeList'
import { Text } from '@chakra-ui/react'

const Successful = () => {
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <Text fontWeight="600" fontSize="31px" py="15px">
          Thank you for sharing your feedback!
        </Text>
        <Text fontWeight="normal" fontSize="16px" pb="15px" color="#59636E">
          Continue to give feedback to other team members.
        </Text>
        <EmployeeList isConfirmation />
      </div>
    </MainLayout>
  )
}

export default Successful
