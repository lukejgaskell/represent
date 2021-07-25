import create from 'zustand'

type ErrorsStore = {
	errors: string[]
	addError: (val: string) => void
	removeError: (val: string) => void
}

export const useErrorStore = create<ErrorsStore>((set) => ({
	errors: [],
	popError: [],
	addError: (message: string) =>
		set((state) => ({
			errors: [...state.errors, message],
		})),
	removeError: (message: string) =>
		set((state) => ({ errors: state.errors.filter((m) => m !== message) })),
}))
