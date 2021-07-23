import { useStore } from 'stores/useErrorStore'
import { Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import * as React from 'react'

type IProps = { message: string }

function Alert({ message }: IProps) {
	const { removeError } = useStore()

	function handleClose() {
		removeError(message)
	}

	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			open={true}
			autoHideDuration={3000}
			onClose={handleClose}
		>
			<MuiAlert elevation={6} variant='filled' severity='error'>
				{message}
			</MuiAlert>
		</Snackbar>
	)
}

export function ErrorToast() {
	const { errors } = useStore()
	if (errors.length === 0) return null

	return (
		<>
			{errors
				.map((message) => <Alert key={message} message={message} />)
				.find(() => true)}
		</>
	)
}
