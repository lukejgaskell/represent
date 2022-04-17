import { Statement } from "./statements/types"
import { Vote } from "./votes/types"

export type ActivityType = "vote" | "statement"

export type ActivityResponse = {
  id: string
  type: ActivityType
  state: string
  district: string
  date: string
}

export type Activity = Statement | Vote
