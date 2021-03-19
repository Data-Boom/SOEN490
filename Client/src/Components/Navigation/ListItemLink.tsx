import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ProtectedRouteModel, userCanView } from '../../Common/Consts/Routes'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

import React from 'react'
import { useUserSelector } from '../../Stores/Slices/UserSlice'

interface IProps {
  id: string;
  icon?: React.ReactElement;
  primary: string;
  protectedRoute: ProtectedRouteModel
}

export const ListItemLink = (props: IProps) => {
  const user = useUserSelector()
  const { id, icon, primary, protectedRoute } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
        <RouterLink to={protectedRoute.route} ref={ref} {...itemProps} />
      )),
    [protectedRoute.route],
  )

  return userCanView(user, protectedRoute.permission) && (
    <ListItem id={id} button component={renderLink}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  )
}