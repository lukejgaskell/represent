import Page from '@/components/page'
import supabase from '@/services/supabase.service'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Login = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	async function signIn() {
		await supabase.auth.signIn({ email, password })
		router.reload()
		setEmail('')
		setPassword('')
	}

	return (
		<Page>
			<div className='font-sans antialiased bg-grey-lightest'>
				<div className='w-full bg-grey-lightest'>
					<div className='container mx-auto py-8'>
						<div className='w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow'>
							<div className='py-4 px-8 text-black text-xl border-b border-grey-lighter'>
								Sign in to get started
							</div>
							<div className='py-4 px-8'>
								<div className='mb-4'>
									<label
										className='block text-grey-darker text-sm font-bold mb-2'
										htmlFor='email'
									>
										Email Address
									</label>
									<input
										onChange={(event) => setEmail(event.target.value)}
										value={email}
										className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
										id='email'
										type='email'
										placeholder='Your email address'
									/>
								</div>
								<div className='mb-4'>
									<label
										className='block text-grey-darker text-sm font-bold mb-2'
										htmlFor='password'
									>
										Password
									</label>
									<input
										onChange={(event) => setPassword(event.target.value)}
										value={password}
										className='appearance-none border rounded w-full py-2 px-3 text-grey-darker'
										id='password'
										type='password'
										placeholder='Your secure password'
									/>
								</div>
								<div className='flex items-center justify-between mt-8'>
									<button
										className='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full'
										onClick={signIn}
										type='submit'
									>
										Sign in
									</button>
								</div>
							</div>
						</div>
						<p className='text-center my-4'>
							<Link href='/signup'>Create an account</Link>
						</p>
					</div>
				</div>
			</div>
		</Page>
	)
}

export async function getServerSideProps({ req }: { req: any }) {
	const { user } = await supabase.auth.api.getUserByCookie(req)

	if (user) {
		return { props: {}, redirect: { destination: '/', permanent: false } }
	}

	return { props: {} }
}

export default Login
