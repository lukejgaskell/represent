import { useRouter } from 'next/router'
import { useEffect } from 'react'
import supabase from 'lib/supabaseClient'

export const useVerifyLoggedIn = () => {
	const { replace, asPath } = useRouter()
	const user = supabase.auth.user()

	useEffect(() => {
		setTimeout(async () => {
			if (!user) {
				replace(`/login?next=${asPath}`)
				return
			}
		}, 1000)
	}, [user, asPath, replace])

	return user
}
