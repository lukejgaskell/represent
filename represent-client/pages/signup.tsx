import Page from '@/components/page'
import supabase from '@/services/supabase.service'
import Link from 'next/link'
import { useState } from 'react'

const Signup = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSignedUp, setIsSignedUp] = useState(false)

	async function createAccount() {
		await supabase.auth.signUp({ email, password })
		setIsSignedUp(true)
		setEmail('')
		setPassword('')
	}
	if (isSignedUp) {
		return (
			<Page>
				<div className='font-sans antialiased bg-grey-lightest'>
					<div className='w-full bg-grey-lightest'>
						<div className='container mx-auto py-8'>
							<div className='w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow'>
								<div className='py-4 px-8 text-black text-xl border-b border-grey-lighter'>
									Thanks for registering!
								</div>
								<p className='text-center my-4'>
									Please check your email to confirm your account
								</p>
							</div>
						</div>
					</div>
				</div>
			</Page>
		)
	}

	return (
		<Page>
			<div className='font-sans antialiased bg-grey-lightest'>
				<div className='w-full bg-grey-lightest'>
					<div className='container mx-auto py-8'>
						<div className='w-5/6 lg:w-1/2 mx-auto bg-white rounded shadow'>
							<div className='py-4 px-8 text-black text-xl border-b border-grey-lighter'>
								Register for a free account
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
									<p className='text-grey text-xs mt-1'>
										At least 10 characters
									</p>
								</div>
								<div className='flex items-center justify-between mt-8'>
									<button
										className='bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded-full'
										onClick={createAccount}
										type='submit'
									>
										Sign Up
									</button>
								</div>
							</div>
						</div>
						<p className='text-center my-4'>
							<Link href='/login'>I already have an account</Link>
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

export default Signup
