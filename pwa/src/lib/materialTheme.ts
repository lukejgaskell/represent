import { createTheme } from '@material-ui/core'
import { isBrowser } from './isBrowser'

const isDark =
	isBrowser() &&
	window.matchMedia &&
	window.matchMedia('(prefers-color-scheme: dark)').matches

export default createTheme({
	palette: {
		type: isDark ? 'dark' : 'light',
	},
})
