import FormInput from 'components/FormInput'
import supabase from 'lib/supabaseClient'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NoAuthLayout } from '../layouts/NoAuthLayout'

export const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm()
	const router = useRouter()
	const [errorMessage, setErrorMessage] = useState<String | null>(null)

	async function onSubmit({ email, password }: any) {
		setErrorMessage(null)
		const { data, error } = await supabase.auth.signIn({ email, password })
		if (error) {
			setErrorMessage(error.message)
			return
		}
		router.push('/')
	}

	return (
		<NoAuthLayout>
			<div className='bg-grey-lighter flex flex-col'>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='bg-white px-6 py-8 rounded shadow-md text-black w-full'
				>
					<h1 className='mb-8 text-3xl text-center'>Log in to get started</h1>
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
						})}
					/>
					<p className='h-5 text-red-600'>{errorMessage}</p>
					<button
						type='submit'
						className='w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-600 focus:outline-none my-1 mt-4'
					>
						Log in
					</button>
				</form>

				<div className='text-grey-dark mt-6'>
					Don&apos;t have an account?{' '}
					<Link href='/signup'>
						<span className='underline cursor-pointer'>Create an account</span>
					</Link>
					.
				</div>
			</div>
		</NoAuthLayout>
	)
}
