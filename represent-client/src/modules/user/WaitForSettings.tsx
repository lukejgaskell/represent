import { getUserSettings } from '@/queries/user'
import { UserData } from '@/types/UserData'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

type WaitForSettings = {}

export const WaitForSettings: React.FC<WaitForSettings> = ({ children }) => {
	const { data, error, isLoading } = useQuery<UserData | undefined>(
		['userSettings'],
		() => getUserSettings()
	)
	const showIntro = !data?.district || !data?.state
	const { replace } = useRouter()

	if (isLoading) {
		return null
	}

	if (!error && showIntro) {
		replace(`/intro`)
		return null
	}

	return <>{children}</>
}
