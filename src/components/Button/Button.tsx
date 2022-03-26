import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'
import { useColorMode } from '@chakra-ui/react'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, onClick, disabled } = props
  const { colorMode } = useColorMode()

  const color = secondary ? (colorMode === 'dark' ? 'white' : 'black') : 'white'

  return (
    <button
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
        [styles.disabled]: disabled,
      })}
      style={{
        color,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
