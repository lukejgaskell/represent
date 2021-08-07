import { states } from '@/lib/stateHelper'

export function isValidStateAbreviation(abv: string) {
	return states.find((s) => s.abbreviation === abv) ? true : false
}
