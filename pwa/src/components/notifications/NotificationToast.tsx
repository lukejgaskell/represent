import { useNotificationStore } from '@/stores/notification/useNotificationStore'
import { Notification } from '@/stores/notification/Notification.type'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as React from 'react'

type IProps = { notification: Notification }

function Alert({ notification }: IProps) {
	const { remove } = useNotificationStore()

	function handleClose() {
		remove(notification)
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={true}
			autoHideDuration={3000}
			style={{ top: 70 }}
			onClose={handleClose}
		>
			<MuiAlert elevation={6} variant='filled' severity={notification.type}>
				{notification.message}
			</MuiAlert>
		</Snackbar>
	)
}

export function NotificationToast() {
	const { notifications } = useNotificationStore()
	if (notifications.length === 0) return null

	return (
		<>
			{notifications
				.map((n) => <Alert key={n.message} notification={n} />)
				.find(() => true)}
		</>
	)
}
