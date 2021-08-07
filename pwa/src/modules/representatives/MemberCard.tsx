import { Button, Card, CardContent, Grid, Theme, Typography, createStyles, makeStyles } from "@material-ui/core"

import { Member } from "@/modules/representatives/Member.type"
import React from "react"

type IProps = Member

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    youtube_button: {
      color: "white",
      backgroundColor: "#B91C1C",
    },
    facebook_button: {
      color: "white",
      backgroundColor: "#1877F2",
    },
    twitter_button: {
      color: "white",
      backgroundColor: "#1DA1F2",
    },
    contact_button: {
      color: "white",
      backgroundColor: "#047857",
    },
  })
)

function partyToColor(party: string) {
  switch ((party || "").toUpperCase()) {
    case "D":
      return "bg-blue-400"
    case "R":
      return "bg-red-400"
  }
  return ""
}

export function MemberCard({
  party,
  first_name,
  last_name,
  title,
  votes_with_party_pct,
  missed_votes_pct,
  state,
  twitter_account,
  youtube_account,
  facebook_account,
  contact_form,
  next_election,
}: IProps) {
  const classes = useStyles()

  return (
    <Card style={{ width: "100%" }}>
      <CardContent className={partyToColor(party)}>
        <Grid container spacing={2} direction="column" xs={12}>
          <Grid item container xs={12} justifyContent="space-between" className="mb-3">
            <Grid item>
              <Typography>{`${first_name} ${last_name}`}</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">{`${state} | ${title}`}</Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" component="p">
                {`With Party % : ${votes_with_party_pct}`}
              </Typography>
              <Typography variant="body2" component="p">
                {`Missed Votes %: ${missed_votes_pct}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" component="p">
                {`Next Election: ${next_election}`}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} spacing={1}>
            {facebook_account && (
              <Grid item xs={6}>
                <a href={`https://www.facebook.com/${facebook_account}`} target="_blank" rel="noreferrer">
                  <Button fullWidth variant="contained" className={classes.facebook_button}>
                    Facebook
                  </Button>
                </a>
              </Grid>
            )}
            {twitter_account && (
              <Grid item xs={6}>
                <a href={`https://www.twitter.com/${twitter_account}`} target="_blank" rel="noopener noreferrer nofollow">
                  <Button fullWidth variant="contained" className={classes.twitter_button}>
                    Twitter
                  </Button>
                </a>
              </Grid>
            )}
            {youtube_account && (
              <Grid item xs={6}>
                <a href={`https://www.youtube.com/${youtube_account}`} target="_blank" rel="noopener noreferrer nofollow">
                  <Button fullWidth variant="contained" className={classes.youtube_button}>
                    Youtube
                  </Button>
                </a>
              </Grid>
            )}
            {contact_form && (
              <Grid item xs={6}>
                <a href={`${contact_form}`} target="_blank" rel="noopener noreferrer nofollow">
                  <Button fullWidth variant="contained" className={classes.contact_button}>
                    Contact
                  </Button>
                </a>
              </Grid>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
