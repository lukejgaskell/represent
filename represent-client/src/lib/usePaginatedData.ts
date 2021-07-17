import { useSWRInfinite } from 'swr'
import { PostgrestError } from '@supabase/supabase-js'

export function usePaginatedData<T>(
	key: string,
	pageSize: number,
	fetcher: (key: string, start: number, end: number) => Promise<T[] | null>
) {
	const { data, error, size, setSize } = useSWRInfinite<any>(
		(page) => [
			`${key}-page-${page + 1}`,
			page * pageSize,
			(page + 1) * pageSize - 1,
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
