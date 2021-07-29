import { useMediaQuery } from '@material-ui/core'

export const isPWA = () => useMediaQuery('display-mode: fullscreen')
