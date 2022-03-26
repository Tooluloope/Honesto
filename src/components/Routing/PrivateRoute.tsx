import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AccountContext } from '../../context/AccountProvider'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { children } = props
  let location = useLocation()

  const currentUser = React.useContext(AccountContext)

  const isLoggedIn = currentUser !== null

  if (!isLoggedIn)
    return <Navigate state={{ from: location }} to="/" replace={true} />

  return children
}

export default PrivateRoute
