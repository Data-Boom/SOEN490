import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from '../Common/Storage'

import { IUserAccountModel } from '../Models/Authentication/IUserAccountModel'

interface IUserContextProps {
  user: IUserAccountModel
  setUserContext: (user: IUserAccountModel) => void
}

interface IProps {
  children: any
}

export const UserContext = React.createContext<Partial<IUserContextProps>>({})

export const UserContextWrapper = (props: IProps) => {
  const { children } = { ...props }
  const [userState, setUserState] = useState<IUserAccountModel>(getUserFromStorage())

  const setUserContext = (user: IUserAccountModel): void => {
    setUserState(user)
    putUserInStorage(user)
  }

  const userContext: IUserContextProps = {
    user: userState,
    setUserContext: setUserContext
  }


  return (
    <>
      <UserContext.Provider value={userContext}>
        {children}
      </UserContext.Provider>
    </>
  )
}