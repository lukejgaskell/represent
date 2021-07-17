import { useRouter } from 'next/router'
import supabase from 'lib/supabaseClient'
import React from 'react'
import DesktopBar from './DesktopBar'
import MobileBar from './MobileBar'

const TopBar = () => {
	const router = useRouter()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.push('/login')
	}

	return <DesktopBar handleSignOut={handleSignOut} />

	// return <MobileBar handleSignOut={handleSignOut} />
}

export default TopBar
