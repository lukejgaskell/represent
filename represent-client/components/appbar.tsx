import Link from 'next/link'
import { useRouter } from 'next/router'
import supabase from '@/services/supabase.service'
import React from 'react'
import {
	AppBar,
	IconButton,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@material-ui/core'
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons'

const links = [
	{ label: 'Votes', href: '/votes' },
	{ label: 'Representatives', href: '/representatives' },
]
const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
}))

const Appbar = () => {
	const user = supabase.auth.user()
	const router = useRouter()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const classes = useStyles()

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.push('/login')
	}

	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography className={classes.title} variant='h6'>
					Represent
				</Typography>
				{user && (
					<div>
						<IconButton
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleMenu}
							color='inherit'
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
						</Menu>
					</div>
				)}
			</Toolbar>
		</AppBar>
	)
}

export default Appbar
