import React, { createContext, useState } from "react"
import { getMembers } from "./api"
import { Member } from "./types"

type ContextProps = {
  items: Member[]
  isLoading: boolean
  loadMembers: (props: ILoadProps) => Promise<void>
}

type ILoadProps = {
  district: string
  state: string
}

const MembersContext = createContext<Partial<ContextProps>>({})

interface Props {
  children: React.ReactNode
}

const MembersProvider = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [items, setItems] = useState<Member[]>([])

  async function loadMembers(fprops: ILoadProps) {
    setIsLoading(true)

    const { data, error } = await getMembers({ ...fprops })
    if (error) {
      setIsLoading(false)
      console.log("error loading members", error)
      return
    }
    setItems(data.items)
    setIsLoading(false)
  }

  return (
    <MembersContext.Provider
      value={{
        isLoading,
        items,
        loadMembers,
      }}
    >
      {props.children}
    </MembersContext.Provider>
  )
}

export { MembersContext, MembersProvider }
