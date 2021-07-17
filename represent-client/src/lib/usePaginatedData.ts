import { useSWRInfinite } from 'swr'
import supabase from 'lib/supabaseClient'
import { PostgrestError } from '@supabase/supabase-js'

async function fetcher<T>(
	key: string,
	table: string,
	select: string,
	order: string,
	page: number,
	pageSize: number,
	ascending: boolean
) {
	const start = (page - 1) * pageSize
	const end = page * pageSize - 1

	const { data, error } = await supabase
		.from<T>(table)
		.select(select)
		.order(order as any, { ascending })
		.range(start, end)
	if (error) throw error

	return data
}

export function usePaginatedData<T>(
	table: string,
	select: string,
	order: string,
	pageSize: number,
	ascending = true
) {
	const { data, error, size, setSize } = useSWRInfinite<any>(
		(page) => [
			`${table}-page-${page + 1}`,
			table,
			select,
			order,
			page + 1,
			pageSize,
			ascending,
		],
		fetcher,
		{ initialSize: 1 }
	)

	const arrData = data ? [].concat(...data) : []
	const isLoading = !data && !error
	const isLoadingMore =
		isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
	const isEmpty = data?.[0]?.length === 0
	const hasMore = !isEmpty && data && data[data.length - 1]?.length >= pageSize

	return {
		data: arrData,
		error,
		isLoading,
		isLoadingMore,
		hasMore,
		page: size,
		setPage: setSize,
	} as {
		data: T[] | null
		error: PostgrestError | null
		isLoading: boolean
		isLoadingMore: boolean
		hasMore: boolean
		page: number
		setPage: typeof setSize
	}
}
