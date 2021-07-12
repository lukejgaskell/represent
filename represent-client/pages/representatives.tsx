import Page from '@/components/page'
import { useEffect, useState } from 'react'
import supabase from '@/services/supabase.service'

const Representatives = () => {
	const [page, setPage] = useState(1)
	const [members, setMembers] = useState<any | null>(null)

	async function loadMembers() {
		const start = (page - 1) * 25
		const end = page * 25

		const { data } = await supabase
			.from('members')
			.select(`metadata->first_name, metadata->last_name`)
			.range(start, end)

		setMembers(data)
	}

	useEffect(() => {
		loadMembers()
	}, [])

	return (
		<Page>
			<section>
				<h2 className='text-xl font-semibold'>Representatives</h2>

				{!members && <h2>Loading...</h2>}
				{members && (
					<ul className='p-10'>
						{members.map((r: any, index: number) => (
							<div
								key={index}
								className='w-full lg:max-w-full lg:flex mt-2 mb-2'
							>
								<div className='w-full border border-gray-400 rounded-b p-4 flex flex-col justify-between leading-normal'>
									<h2 className='text-base'>
										{r.first_name + ' ' + r.last_name}
									</h2>
								</div>
							</div>
						))}
					</ul>
				)}
			</section>
		</Page>
	)
}

// export async function getServerSideProps({ req }: { req: any }) {
// 	const { user } = await supabase.auth.api.getUserByCookie(req)

// 	if (!user) {
// 		// If no user, redirect to index.
// 		return { props: {}, redirect: { destination: '/login', permanent: false } }
// 	}

// 	// If there is a user, return it.
// 	return { props: { user } }
// }

export default Representatives
