import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { v4 as uuid } from 'uuid';

import styled from 'styled-components'

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow)


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    // overflowX: 'auto',
    paddingBottom: '2rem',
  },
  table: {
    width: '100%',
    margin: 'auto',
    // overflowX: 'auto',
  },
  title: {
    padding: '1rem',
  },
}))

const TableContainer = styled.div`
  width: 90%;
  overflow-x: auto;
  margin: auto;
`

export default function CustomTable({ title, rows }) {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h5" className={classes.title}>
        {title}
      </Typography>
      <TableContainer>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Recipient</StyledTableCell>
              <StyledTableCell align="center">Sender</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
              rows.map(row => (
                <StyledTableRow key={uuid.v4()}>
                  <StyledTableCell align="center">
                    {row.recipient}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.sender === '0' ? 'Mined Coin' : row.sender}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.amount}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}