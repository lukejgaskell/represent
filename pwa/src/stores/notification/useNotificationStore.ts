import create from 'zustand'
import { Notification } from './Notification.type'

type NotificationStore = {
	notifications: Notification[]
	notify: (val: Notification) => void
	remove: (val: Notification) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
	notifications: [],
	notify: (n: Notification) =>
		set((state) => ({
			notifications: [...state.notifications, n],
		})),
	remove: (n: Notification) =>
		set((state) => ({
			notifications: state.notifications.filter((m) => m !== n),
		})),
}))
