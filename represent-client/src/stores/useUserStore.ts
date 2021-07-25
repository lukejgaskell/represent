import { UserData } from '@/types/UserData'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type SettingsStore = {
	settings: UserData
	setSettings: (data: UserData) => void
}

export const useUserStore = create<SettingsStore>(
	persist(
		(set) => ({
			settings: {} as UserData,
			setSettings: (data: UserData) => set({ settings: data }),
		}),
		{
			name: 'settings-store',
		}
	)
)
