import { useRouter } from 'next/router'
import { useEffect } from 'react'
import supabase from 'lib/supabaseClient'

export const useVerifyNotLoggedIn = () => {
	const { replace, asPath } = useRouter()
	const user = supabase.auth.user()

	useEffect(() => {
		if (user) {
			replace(`/`)
		}
	}, [user, asPath, replace])

	return !user
}
