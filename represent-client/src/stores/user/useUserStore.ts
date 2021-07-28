import { getUserSettings, saveUserData } from '@/queries/user'

import { UserData } from '@/stores/user/UserData.type'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { useErrorStore } from '../useErrorStore'

let saveTimeout: ReturnType<typeof setTimeout>

type SettingsStore = {
	settings: UserData
	isLoading: boolean
	saveSettings: (data: UserData) => void
	loadSettings: () => Promise<void>
}

export const useUserStore = create<SettingsStore>(
	persist(
		(set, get) => ({
			settings: {} as UserData,
			isLoading: false,
			saveSettings: (userData: UserData) => {
				const updatedSettings = { ...get().settings, ...userData }
				set({ settings: updatedSettings })

				if (saveTimeout) clearTimeout(saveTimeout)

				saveTimeout = setTimeout(async () => {
					await saveUserData(updatedSettings)
				}, 2000)
			},
			loadSettings: async () => {
				const { addError } = useErrorStore.getState()
				set({ isLoading: true })
				const { data, error } = await getUserSettings()
				if (error) {
					set({ isLoading: false })
					addError(error.message)
				}

				set({ settings: data || ({} as UserData), isLoading: false })
			},
		}),
		{
			name: 'settings-store',
		}
	)
)
