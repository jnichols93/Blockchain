import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
    Paper,
    InputAdornment,
    Button,
    FormControlLabel,
    Checkbox,
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import styled from 'styled-components'


const useStyles = makeStyles(theme => ({
    container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    },
    textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(1),
    // marginBottom: theme.spacing(2),
    width: '95%',
    },
    paper: {
    //   width: '50%',
    margin: '1rem auto',
    },
    button: {
    margin: '2rem auto',
    },
    label: {
    //   alignSelf: 'flex-end'
    display: 'block',
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(2),
    },
    checkbox: {
    paddingTop: 0,
    },
}))

const Left = styled.div`
    width: 75%;
    `

export default function UserForm({
    handleSubmit,
    handleCheck,
    handleTextChange,
    username,
    checked,
}) {
    const classes = useStyles()
    return (
    <Paper className={classes.paper}>
    <form
        className={classes.container}
        onSubmit={handleSubmit}
        autoComplete="off"
    >
        <Left>
        <TextField
            required
            id="username"
            name="username"
            className={classes.textField}
            label="Enter your username"
            margin="normal"
            value={username}
            onChange={handleTextChange}
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <AccountCircle />
                </InputAdornment>
            ),
            }}/>
    <FormControlLabel
            className={classes.label}
            control={
            <Checkbox
                checked={checked}
                className={classes.checkbox}
                color="primary"
                onClick={handleCheck}
            />
            }
            label="Remember Me"
        />
        </Left>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
    </Paper>
  )
}