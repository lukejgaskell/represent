import { UserData } from "./UserData.type"
import axios from "axios"
import supabase from "../../lib/supabaseClient"

export function saveUserData(userData: UserData) {
  const userId = supabase.auth.user()?.id
  return supabase.from("users").upsert({ id: userId, data: userData })
}

export async function getUserSettings() {
  const user = supabase.auth.user()

  const { data, error } = await supabase.from<{ id: String; data: UserData }>("users").select("data").filter("id", "eq", user?.id)

  const settings = data?.map(d => d.data).find(() => true)

  return { data: settings, error }
}

export function getAddressInfo(address: string) {
  return axios.get(`/api/district?address=${address}`).then(res => res.data)
}
