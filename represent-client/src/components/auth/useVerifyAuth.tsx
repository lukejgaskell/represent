import { useRouter } from 'next/router'
import { useEffect } from 'react'
import supabase from 'lib/supabaseClient'

export const useVerifyLoggedIn = () => {
	const { replace, asPath } = useRouter()
	const user = supabase.auth.user()

	useEffect(() => {
		console.log(user)
		if (!user) {
			replace(`/login?next=${asPath}`)
		}
	}, [user, asPath, replace])

	return user
}
