import React from 'react'
import styled from 'styled-components'
import SilentLink from './SilentLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'

const MenuContainer = styled.div`
  width: 100%;
  height: calc(100% - 55px);
  position: fixed;
  top: 55px; right: 0;
`

const MenuStyled = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  background-color: #262626;
  width: 100%;
  max-width: 300px;
`

const MenuItemStyled = styled.div`
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  background-color: rgba(0,0,0,0.1);
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
`
const ItemIcon = styled(FontAwesomeIcon)`
  padding-left: 15px;
  padding-right: 15px;
`

const MenuItem = (props) => (
  <SilentLink to={props.to}>
    <MenuItemStyled>
      <ItemIcon icon={props.icon} />
      {props.children}
    </MenuItemStyled>
  </SilentLink>
)

const Menu = (props) => (
  <MenuContainer onClick={props.closeMenu}>
    <MenuStyled onClick={(e) => e.stopPropagation()}>
      <MenuItem to='/' icon='home'>Home</MenuItem>
      <MenuItem to='/tags' icon='tag'>Tags</MenuItem>
      <MenuItem to='/upload' icon='file-upload'>Upload</MenuItem>
      <MenuItem to='/about' icon='info-circle'>About</MenuItem>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        textAlign: 'center',
        width: '100%'
      }}>© {(new Date()).getFullYear()} {config.companyName}</div>
    </MenuStyled>
  </MenuContainer>
)

export default Menu
