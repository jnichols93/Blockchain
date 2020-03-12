import React from 'react'

import { makeStyles } from '@material-ui/core/styles'

import { Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    //   width: '50%',
    margin: '1rem auto',
    padding: '3rem',
  },
  balance: {
      background: theme.palette.background.default,
      padding: "1rem 2rem"
  },
}))

export default function User({ username, balance }) {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h5" >
        {`Welcome, ${username}`}
      </Typography>
      <Typography variant="h6" component="h6" className={classes.balance}>
        {`Balance: ${balance}`}
      </Typography>
    </Paper>
  )
}