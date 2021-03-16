import React, { useState } from 'react'
import { getUserFromStorage, putUserInStorage } from './Common/Storage'

import { IUserAccountModel } from './Models/Authentication/IUserAccountModel'

interface IUserContextProps {
  user: IUserAccountModel
  setUserContext: (user: IUserAccountModel) => void
}


export const UserContext = (props) => {
  const { children } = { ...props }
  const context = React.createContext<Partial<IUserContextProps>>({})

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

const [userState, setUserState] = useState<IUserAccountModel>(getUserFromStorage())

const setUserContext = (user: IUserAccountModel): void => {
  setUserState(user)
  putUserInStorage(user)
}