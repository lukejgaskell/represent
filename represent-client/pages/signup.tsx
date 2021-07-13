import Page from '@/components/page'
import supabase from '@/services/supabase.service'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/FormInput'
import { useRouter } from 'next/router'

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm()
	const [isSignedUp, setIsSignedUp] = useState(false)
	const router = useRouter()
	const user = supabase.auth.user()

	useEffect(() => {
		if (user) router.push('/')
	}, [])

	async function onSubmit({ email, password }: any) {
		await supabase.auth.signUp({ email, password })
		setIsSignedUp(true)
	}

	if (isSignedUp) {
		return (
			<Page requiresAuth={false}>
				<div className='bg-grey-lighter flex flex-col'>
					<div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
						<h1 className='mb-8 text-3xl text-center'>Welcome to Represent</h1>
						<p className='mb-8'>
							We have sent you an email, follow the instructions in the email to
							verify your account.
						</p>
					</div>
				</div>
			</Page>
		)
	}

	return (
		<Page requiresAuth={false}>
			<div className='bg-grey-lighter flex flex-col'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white px-6 py-8 rounded shadow-md text-black w-full'
				>
					<h1 className='mb-8 text-3xl text-center'>Create your account</h1>
					<FormInput
						type='text'
						placeholder='Email'
						errors={errors}
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Must be a valid email',
							},
						})}
					/>

					<FormInput
						type='password'
						placeholder='Password'
						errors={errors}
						{...register('password', {
							required: 'Password is required',
							maxLength: {
								value: 40,
								message: 'Maximum of 40 characters',
							},
							minLength: {
								value: 10,
								message: 'Minimum of 10 characters',
							},
						})}
					/>

					<FormInput
						type='password'
						placeholder='Confirm Password'
						errors={errors}
						{...register('confirmPassword', {
							validate: {
								passwordsMatch: (value) =>
									value === getValues().password || 'Passwords do not match',
							},
						})}
					/>

					<button
						type='submit'
						className='w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-600 focus:outline-none my-1 mt-4'
					>
						Create Account
					</button>

					<div className='text-center text-sm text-grey-dark mt-4'>
						By signing up, you agree to the{' '}
						<a
							className='no-underline border-b border-grey-dark text-grey-dark'
							href='https://www.privacypolicyonline.com/live.php?token=Wc7dYq5Ft8crl3qyXF1FNVruva09EMMx'
						>
							Terms of Service
						</a>{' '}
						and{' '}
						<a
							className='no-underline border-b border-grey-dark text-grey-dark'
							href='https://www.privacypolicytemplate.net/live.php?token=it1aCduqEyvG15S9SF59tOtEOQMzEs7t'
						>
							Privacy Policy
						</a>
					</div>
				</form>

				<div className='text-grey-dark mt-6'>
					Already have an account? <Link href='/login'>Log in</Link>.
				</div>
			</div>
		</Page>
	)
}

export default Signup
