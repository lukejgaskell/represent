import { Activity, ActivityType } from "./types"
import React, { createContext, useState } from "react"

import { AppContext } from "../../stores/user/AppProvider"
import { getActivity } from "./api"
import { getStatements } from "./statements/api"
import { getVotes } from "./votes/api"
import { sortByDate } from "../../lib/dateUtils"

type ContextProps = {
  items: Activity[]
  selectedItem: Activity | null
  isLoadingItem: boolean
  isLoadingList: boolean
  loadActivity: (props: ILoadProps) => Promise<void>
  loadSelectedActivity: (id: string, type: ActivityType) => Promise<void>
  unloadSelectedActvitity: () => void
}

type ILoadProps = {
  reset: boolean
}

const ActivityContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const ActivityProvider = (props: Props) => {
  const { settings } = React.useContext(AppContext)
  const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false)
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true)
  const [page, setPage] = useState<number>(0)
  const [items, setItems] = useState<Activity[]>([])
  const [selectedItem, setSelectedItem] = useState<Activity | null>(null)

  async function loadActivity(fprops: ILoadProps) {
    setIsLoadingList(true)

    const currPage = fprops.reset ? 0 : page
    const currItems = fprops.reset ? [] : items
    const activity = await getActivity({ page: currPage, state: settings?.state, district: settings?.district })

    const voteIds = activity.data?.items.filter(item => item.type === "vote").map(item => item.id)
    const statementIds = activity.data?.items.filter(item => item.type === "statement").map(item => item.id)

    const promises = []
    const newItems: Array<Activity> = []

    if (statementIds && statementIds.length > 0) {
      promises.push(getStatements(statementIds))
    }

    if (voteIds && voteIds.length > 0) {
      promises.push(getVotes({ voteIds, state: settings?.state, district: settings?.district }))
    }

    await Promise.all(promises).then(r =>
      r.forEach(v => {
        if (v.data && v.data.length > 0) {
          newItems.push(...v.data)
        }
      })
    )

    if (activity.error) {
      setIsLoadingList(false)
      return
    }

    setItems(currItems.concat(newItems.sort(sortByDate)))
    setPage(currPage + 1)
    setIsLoadingList(false)
  }

  async function loadSelectedActivity(id: string, type: ActivityType) {
    setSelectedItem(null)
    let item = items.filter(a => a.type === type && a.id === id).find(() => true)
    if (!item) {
      setIsLoadingItem(true)
      if (type === "vote") {
        const { data, error } = await getVotes({ voteIds: [id], state: settings?.state, district: settings?.district })
        if (data && data.length > 0) item = data[0]
      }
      if (type === "statement") {
        const { data, error } = await getStatements([id])
        if (data && data.length > 0) item = data[0]
      }
    }
    setSelectedItem(item || null)
    setIsLoadingItem(false)
  }

  function unloadSelectedActvitity() {
    setSelectedItem(null)
  }

  return (
    <ActivityContext.Provider
      value={{
        isLoadingItem,
        isLoadingList,
        items,
        selectedItem,
        loadActivity,
        loadSelectedActivity,
        unloadSelectedActvitity,
      }}
    >
      {props.children}
    </ActivityContext.Provider>
  )
}

export { ActivityContext, ActivityProvider }
