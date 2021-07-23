import { UserData } from '@/types/UserData'
import supabase from 'lib/supabaseClient'

export function saveUserData(userData: UserData) {
	const userId = supabase.auth.user()?.id
	return supabase.from('users').upsert({ id: userId, data: userData })
}

export async function getUserSettings() {
	const user = supabase.auth.user()
	const { data, error } = await supabase
		.from<{ id: String; data: UserData }>('users')
		.select('data')
		.filter('id', 'eq', user?.id)
		.maybeSingle()

	if (error) throw error

	return data?.data
}
