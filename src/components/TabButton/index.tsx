import { useTab, useMultiStyleConfig, Button } from '@chakra-ui/react'
import React from 'react'
import User from '../User/User'
import { UserT } from '../../context/types'

interface ICustomButton {
  user: UserT
}
export const CustomTab = React.forwardRef<HTMLElement, ICustomButton>(
  (props, ref) => {
    const tabProps = useTab({ ...props, ref })
    const isSelected = !!tabProps['aria-selected']

    const styles = useMultiStyleConfig('Tabs', tabProps)

    return (
      <Button
        __css={styles.tab}
        style={{
          color: isSelected ? '#031323' : '',
          borderBottom: ' 1px solid #D9DCDE',
        }}
        _hover={{
          background: '#FBF7FE',
          color: '#031323',
        }}
        _active={{
          background: '#F2F3F4',
          color: '#031323',
        }}
        background={`${isSelected ? '#F2F3F4' : ''}`}
        {...tabProps}
        py="10px"
        color="#59636E"
        fontWeight="600"
        fontSize="16px"
      >
        <User avatarUrl={props.user.avatarUrl} name={props.user.name} />
      </Button>
    )
  },
)
