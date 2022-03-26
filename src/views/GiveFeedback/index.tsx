import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import styles from './giveFeedback.module.css'
import { EmployeeList } from '../../components/EmployeeList'
import { Text } from '@chakra-ui/react'
const GiveFeedback = () => {
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <Text fontWeight="600" fontSize="31px" py="15px">
          Share Feedback
        </Text>
        <EmployeeList />
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
