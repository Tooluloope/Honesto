import * as React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = (props: PrivateRouteProps): JSX.Element => {
  const { children } = props
  let location = useLocation()

  const { account } = useAppSelector((state) => state.account)

  const isLoggedIn = account !== null

  if (!isLoggedIn)
    return <Navigate state={{ from: location }} to="/" replace={true} />

  return children
}

export default PrivateRoute
