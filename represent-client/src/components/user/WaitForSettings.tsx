import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserStore } from '@/stores/user/useUserStore'

type WaitForSettings = {}

export const WaitForSettings: React.FC<WaitForSettings> = ({ children }) => {
	const [isNotYetLoading, setIsNotYetLoading] = useState(true)
	const { settings, loadSettings, isLoading } = useUserStore()
	const hasSettings = !!settings.district && !!settings.state
	const hasSeenWelcome = settings.hasSeenWelcome
	const { replace } = useRouter()

	useEffect(() => {
		setImmediate(async () => {
			await loadSettings()
			setIsNotYetLoading(false)
		})
	}, [])

	if ((isLoading || isNotYetLoading) && (!hasSettings || !hasSeenWelcome)) {
		return null
	}

	if (!hasSettings) {
		replace(`/intro`)
		return null
	}

	if (!hasSeenWelcome) {
		replace(`/welcome`)
		return null
	}

	return <>{children}</>
}
