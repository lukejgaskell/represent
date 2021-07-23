import { getAddressInfo } from '@/queries/user'
import { useStore } from 'stores/useErrorStore'
import {
	Button,
	CircularProgress,
	Grid,
	TextField,
	Typography,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { FocusedLayout } from '../layouts/FocusedLayout'
import { isValidStateAbreviation } from './validation'
import { saveUserData } from '@/queries/user'
import { useRouter } from 'next/router'

export const IntroPage = () => {
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [stateAbv, setStateAbv] = useState('')
	const [district, setDistrict] = useState('')
	const [isStateError, setIsStateError] = useState(false)
	const [isTimerRunning, setIsTimerRunning] = useState(false)
	const errorStore = useStore()
	const router = useRouter()

	const canContinue = !(stateAbv.length > 0 && district.length > 0)
	const canAddressSearch =
		address.length > 0 && city.length > 0 && state.length > 0

	useEffect(() => {
		if (!canAddressSearch) return
		setIsTimerRunning(true)

		const timer = setTimeout(async () => {
			try {
				const res = await getAddressInfo(`${address}, ${city} ${state}`)
				if (res.district === null || res.district === undefined) {
					errorStore.addError(
						'We were unable to determine your district from your address, please fix your address or type your district manually.'
					)
				} else {
					setDistrict(res.district?.toString())
					setStateAbv(res.state?.toString())
				}
			} catch (e) {
				errorStore.addError(
					'We had a issue determining your district please try again later or type it in manually.'
				)
			}

			setIsTimerRunning(false)
		}, 3000)

		return () => clearTimeout(timer)
	}, [address, city, state])

	useEffect(() => {
		if (isStateError) setIsStateError(false)
	}, [stateAbv])

	async function handleContinue() {
		const isValidState =
			stateAbv.length > 1 && isValidStateAbreviation(stateAbv)
		if (!isValidState) return setIsStateError(true)

		const { error } = await saveUserData({ state: stateAbv, district })
		if (error) return errorStore.addError('Failed to save information')

		router.push('/')
	}

	return (
		<FocusedLayout title='intro'>
			<section className='mt-15'>
				<Grid container direction='column' justifyContent='center' spacing={3}>
					<Grid item container spacing={3}>
						<Grid item xs={12} className='text-center'>
							<h2 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
								Help us find your representatives!
							</h2>
							<p>
								Please enter your address or your state and congressional
								district
							</p>
						</Grid>
						<Grid item xs={12} className='mt-4 mb-4'>
							<Grid container spacing={1}>
								<Grid item xs={12} sm={7}>
									<TextField
										fullWidth
										label='Address'
										variant='outlined'
										value={address}
										onChange={(event) => setAddress(event.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										fullWidth
										label='City'
										variant='outlined'
										value={city}
										onChange={(event) => setCity(event.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={2}>
									<TextField
										fullWidth
										label='State'
										variant='outlined'
										value={state}
										onChange={(event) => setState(event.target.value)}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					{isTimerRunning ? (
						<Grid item className='text-center'>
							<CircularProgress />
						</Grid>
					) : (
						<>
							<Grid item className='text-center'>
								<Typography>OR</Typography>
							</Grid>
							<Grid item container direction='column' spacing={1}>
								<Grid item>
									<TextField
										error={isStateError}
										fullWidth
										label='State Abbreviation'
										variant='outlined'
										value={stateAbv}
										onChange={(event) =>
											setStateAbv(event.target.value.toUpperCase())
										}
									/>
								</Grid>
								<Grid item>
									<TextField
										fullWidth
										label='Congressional District'
										variant='outlined'
										value={district}
										onChange={(event) => setDistrict(event.target.value)}
									/>
								</Grid>
							</Grid>
						</>
					)}
					<Grid item>
						<Button
							variant='contained'
							color='primary'
							fullWidth
							disabled={canContinue}
							onClick={handleContinue}
						>
							Continue
						</Button>
					</Grid>
				</Grid>
			</section>
		</FocusedLayout>
	)
}
