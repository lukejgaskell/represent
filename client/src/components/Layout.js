import React from "react"
import AppBar from "@material-ui/core/AppBar"
import CameraIcon from "@material-ui/icons/PhotoCamera"
import Container from "@material-ui/core/Container"
import CssBaseline from "@material-ui/core/CssBaseline"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import Footer from "./Footer.js"

export default function Layout(props) {
  const theme = useTheme()

  const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "50%",
    },
    cardContent: {
      flexGrow: 1,
    },
  }))

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Represent
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md"></Container>
      </main>
      <Footer />
    </>
  )
}
