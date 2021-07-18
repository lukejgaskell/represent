import { useRouter } from 'next/router'
import supabase from 'lib/supabaseClient'
import React from 'react'
import DesktopBar from './DesktopBar'

type IProps = {
	pageTitle: string
}

const TopBar = ({ pageTitle }: IProps) => {
	const router = useRouter()

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.push('/login')
	}

	return <DesktopBar handleSignOut={handleSignOut} pageTitle={pageTitle} />
}

export default TopBar
