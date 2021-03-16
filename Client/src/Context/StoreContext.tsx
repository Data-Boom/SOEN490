import React, { useState } from 'react'

import { RootStore } from '../Components/Utils/Stores/RootStore'

interface IStoreContextProps {
  store: RootStore
}

interface IProps {
  children: any
}

export const StoreContext = React.createContext<Partial<IStoreContextProps>>({})

export const StoreContextWrapper = (props: IProps) => {
  const { children } = { ...props }
  const [storeState] = useState<RootStore>(new RootStore())

  const storeContext: IStoreContextProps = {
    store: storeState,
  }

  return (
    <>
      <StoreContext.Provider value={storeContext}>
        {children}
      </StoreContext.Provider>
    </>
  )
}