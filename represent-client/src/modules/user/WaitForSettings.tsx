import { getUserSettings } from '@/queries/user'
import { useErrorStore } from '@/stores/useErrorStore'
import { useUserStore } from '@/stores/useUserStore'
import { UserData } from '@/types/UserData'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type WaitForSettings = {}

export const WaitForSettings: React.FC<WaitForSettings> = ({ children }) => {
	const { settings, loadSettings, isLoading } = useUserStore()
	const hasSettings = !!settings.district && !!settings.state
	const { replace } = useRouter()

	useEffect(() => {
		loadSettings()
	}, [])

	if (isLoading && !hasSettings) {
		return null
	}

	if (!hasSettings) {
		replace(`/intro`)
		return null
	}

	return <>{children}</>
}
