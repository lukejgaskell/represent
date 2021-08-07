import React from 'react'
import { useVerifyNotLoggedIn } from './useVerifyNoAuth'

type WaitForNoAuthProps = {}

export const WaitForNoAuth: React.FC<WaitForNoAuthProps> = ({ children }) => {
	if (!useVerifyNotLoggedIn()) {
		return null
	}

	return <>{children}</>
}
