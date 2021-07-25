import { getUserSettings } from '@/queries/user'
import { useErrorStore } from '@/stores/useErrorStore'
import { useUserStore } from '@/stores/useUserStore'
import { UserData } from '@/types/UserData'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type WaitForSettings = {}

export const WaitForSettings: React.FC<WaitForSettings> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(true)
	const { settings, setSettings } = useUserStore()
	const { addError } = useErrorStore()
	const hasSettings = !!settings.district && !!settings.state
	const { replace } = useRouter()

	useEffect(() => {
		getUserSettings().then(({ data, error }) => {
			if (error) {
				addError(error.message)
			} else {
				setSettings(data || ({} as UserData))
			}
			setIsLoading(false)
		})
	}, [])

	console.log('settings', settings)

	console.log('hasSettings', hasSettings)

	if (isLoading && !hasSettings) {
		return null
	}

	if (!hasSettings) {
		replace(`/intro`)
		return null
	}

	return <>{children}</>
}
