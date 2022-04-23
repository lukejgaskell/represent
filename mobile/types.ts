export type Paginated<T> = {
  hasMore: boolean
  items: Array<T>
  nextPage: number
}
