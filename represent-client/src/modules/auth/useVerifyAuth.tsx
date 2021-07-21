import { useRouter } from 'next/router'
import { useEffect } from 'react'
import supabase from 'lib/supabaseClient'

export const useVerifyLoggedIn = () => {
	const { replace, asPath } = useRouter()
	const user = supabase.auth.user()

	useEffect(() => {
		setTimeout(() => {
			if (!user) {
				replace(`/login?next=${asPath}`)
				return
			}
			if (user?.user_metadata.state || user?.user_metadata.district) {
				replace('/intro')
				return
			}
		}, 1000)
	}, [user, asPath, replace])

	return user
}
