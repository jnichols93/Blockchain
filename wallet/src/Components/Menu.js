import React from 'react'
import { Menu as MUIMenu, MenuItem, IconButton } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { styled } from '@material-ui/styles'

export const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0,
  color: 'white',
  'z-index': 999,
})

const Menu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = () => {
    props.logout()
    handleClose()
  }
  return (
    <div>
      <StyledIconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon fontSize="large" />
      </StyledIconButton>
      <MUIMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MUIMenu>
    </div>
  )
}
export default Menu