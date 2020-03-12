import React, { useState, useEffect } from 'react'

import styled from 'styled-components'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import { Typography } from '@material-ui/core'

import axios from 'axios'

import UserForm from './Components/UserForm'
import Menu from './Components/Menu'
import CustomTable from './Components/Table'
import User from './Components/User'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
})

const StyledArticle = styled.article`
  width: 50%;
  margin: 1rem auto;
`

function App() {
  const [username, setUserName] = useState('')
  const [user, setUser] = useState('')
  const [checked, setCheck] = useState(false)
  const [sent, setSent] = useState([])
  const [received, setReceived] = useState([])
  const [balance, setBalance] = useState(null)
  const getTransactions = (user) => {
    axios
      .get('http://localhost:5000/transactions', {
        headers: {
          id: user,
        },
      })
      .then(res => {
        console.log(res)
        setBalance(res.data.balance)
        setSent(res.data.sent)
        setReceived(res.data.received)
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    if (localStorage.getItem('coin-user')) {
      setUser(localStorage.getItem('coin-user'))
      getTransactions(localStorage.getItem('coin-user'))
    }
  }, [])
  const handleTextChange = e => {
    setUserName(e.target.value)
  }
  const handleCheck = e => {
    setCheck(!checked)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setUser(username)
    if (checked) {
      localStorage.setItem('coin-user', username)
    }
    getTransactions(username)
    setUserName('')
  }
  const logout = e => {
    localStorage.removeItem('coin-user')
    setUser('')
    setUserName('')
    setSent([])
    setReceived([])
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Menu logout={logout}/>
        <StyledArticle className="App">
          <Typography variant="h2" component="h2">
            Coin Miner
          </Typography>
          {user.length > 0 ? (
            <User username={user} balance={balance}/>
          ) : (
            <UserForm
              handleSubmit={handleSubmit}
              handleCheck={handleCheck}
              handleTextChange={handleTextChange}
              username={username}
              checked={checked}
            />
          )}
          <Typography variant="h3" component="h3">
            Transactions
          </Typography>
          <CustomTable title="Sent" rows={sent} />
          <CustomTable title="Received" rows={received} />
        </StyledArticle>
      </CssBaseline>
    </ThemeProvider>
  )
}

export default App