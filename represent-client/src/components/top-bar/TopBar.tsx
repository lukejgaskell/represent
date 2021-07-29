import { useRouter } from 'next/router'
import supabase from 'lib/supabaseClient'
import {
	AppBar,
	Button,
	Grid,
	IconButton,
	Link,
	makeStyles,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	useMediaQuery,
} from '@material-ui/core'
import React from 'react'
import { AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	mobileAppBar: {
		paddingTop: 35,
	},
	title: {
		flexGrow: 1,
	},
}))
type IProps = {
	pageTitle: string
}

const TopBar = ({ pageTitle }: IProps) => {
	const router = useRouter()
	const isPwa = useMediaQuery('(display-mode: standalone)')

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.push('/login')
	}

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const classes = useStyles()

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<AppBar
			position='fixed'
			className={isPwa ? classes.mobileAppBar : undefined}
		>
			<Toolbar>
				<Typography className={classes.title} variant='h6'>
					Represent | {pageTitle}
				</Typography>
				<div className='hidden sm:block'>
					<Grid container justifyContent='flex-end' spacing={1}>
						<Grid item>
							<Link href='/votes'>
								<Button className='dark:text-white'>Votes</Button>
							</Link>
						</Grid>
						<Grid item>
							<Link href='/representatives'>
								<Button className='dark:text-white'>Representatives</Button>
							</Link>
						</Grid>
					</Grid>
				</div>
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
			</Toolbar>
		</AppBar>
	)
}

export default TopBar
