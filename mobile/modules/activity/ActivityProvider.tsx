import React, { createContext, useState } from "react"
import { getActivity } from "./api"
import { Activity } from "./types"

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
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [items, setItems] = useState<Activity[]>([])

  async function loadActivity(fprops: ILoadProps) {
    setIsLoading(true)
    if (fprops.reset) {
      setItems([])
      setCurrentPage(0)
    }

    const { data, error } = await getActivity({ ...fprops, page: currentPage })
    if (error) {
      setIsLoading(false)
      console.log("error loading activity", error)
      return
    }
    setItems(items.concat(data?.items || []))
    setCurrentPage(currentPage + 1)
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
