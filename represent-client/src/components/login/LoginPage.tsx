import { Button, Grid } from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { NoAuthLayout } from '../layouts/NoAuthLayout'
import GoogleIcon from '../../../public/images/google-icon.svg'
import Image from 'next/image'

export const LoginPage = () => {
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<String | null>(null)

	async function loginWithGoogle() {
		setErrorMessage(null)
		const { data, error } = await supabase.auth.signIn({ provider: 'google' })
		if (error) {
			setErrorMessage(error.message)
			return
		}
		router.push('/')
	}

	return (
		<NoAuthLayout>
			<Grid container direction='column' alignItems='center' spacing={3}>
				<Grid item>
					<h1 className='text-3xl text-center'>Welcome to Represent</h1>
				</Grid>
				<Grid item>
					<h3 className='text-2xl text-center'>Log in to get started</h3>
				</Grid>
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
				<Grid item>
					<Button variant='outlined' onClick={() => loginWithGoogle()}>
						<Image src={GoogleIcon} />
						<span className='ml-3'>Login With Google</span>
					</Button>
				</Grid>
			</Grid>
		</NoAuthLayout>
	)
}
