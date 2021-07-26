import { Button, Grid } from '@material-ui/core'
import supabase from 'lib/supabaseClient'
import React, { useState } from 'react'
import { NoAuthLayout } from '../layouts/NoAuthLayout'
import GoogleIcon from '../../../public/images/google-icon.svg'
import LightRepresentLogo from '../../../public/images/logo.svg'
import DarkRepresentLogo from '../../../public/images/logo-dark-mode.svg'
import Image from 'next/image'

export const LoginPage = () => {
	const [errorMessage, setErrorMessage] = useState<String | null>(null)

	async function loginWithGoogle() {
		setErrorMessage(null)
		const { data, error } = await supabase.auth.signIn(
			{ provider: 'google' },
			{ redirectTo: location.origin }
		)
		if (error) {
			setErrorMessage(error.message)
			return
		}
	}

	return (
		<NoAuthLayout>
			<Grid
				container
				direction='column'
				alignItems='center'
				spacing={3}
				className='pt-32'
			>
				<Grid item>
					<div className='hidden dark:block'>
						<Image src={DarkRepresentLogo} />
					</div>
					<div className='block dark:hidden'>
						<Image src={LightRepresentLogo} />
					</div>
				</Grid>
				<Grid item>
					<Button variant='outlined' onClick={() => loginWithGoogle()}>
						<Image src={GoogleIcon} />
						<span className='ml-3'>Login With Google</span>
					</Button>
				</Grid>
				<Grid item>
					<p className='h-5 text-red-600'>{errorMessage}</p>
				</Grid>
			</Grid>
		</NoAuthLayout>
	)
}
