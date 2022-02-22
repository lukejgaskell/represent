import React, { createContext, useState } from "react"

import { Activity } from "./types"
import { getActivity } from "./api"

type ContextProps = {
  items: Activity[]
  isLoading: boolean
  loadActivity: (props: ILoadProps) => Promise<void>
}

type ILoadProps = {
  reset: boolean
  district: string
  state: string
}

const ActivityContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const ActivityProvider = (props: Props) => {
  // user null = loading
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [items, setItems] = useState<Activity[]>([])

  async function loadActivity(fprops: ILoadProps) {
    setIsLoading(true)

    const currPage = fprops.reset ? 0 : page
    const currItems = fprops.reset ? [] : items

    const { data, error } = await getActivity({ ...fprops, page: currPage })
    if (error) {
      setIsLoading(false)
      console.log("error loading activity", error)
      return
    }

    setItems(currItems.concat(data?.items || []))
    setPage(currPage + 1)
    setIsLoading(false)
  }

  return (
    <ActivityContext.Provider
      value={{
        isLoading,
        items,
        loadActivity,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  )
}

export { ActivityContext, ActivityProvider }
