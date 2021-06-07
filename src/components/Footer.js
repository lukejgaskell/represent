import React from "react"

import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"

export default function Footer() {
  const useStyles = makeStyles(theme => ({
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }))

  const classes = useStyles()

  return <footer className={classes.footer}></footer>
}
