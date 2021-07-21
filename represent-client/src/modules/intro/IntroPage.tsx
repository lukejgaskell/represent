import { DefaultLayout } from '@/modules/layouts/DefaultLayout'
import { TextField } from '@material-ui/core'
import React from 'react'

export const IntroPage = () => (
	<DefaultLayout title='info'>
		<section className='mt-15'>
			<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200'>
				Help us find your representatives!
			</h2>

			<form noValidate autoComplete='off'>
				<TextField label='State' variant='outlined' />
				<TextField label='Congressional District' variant='outlined' />
			</form>
		</section>
	</DefaultLayout>
)
