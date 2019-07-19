import React, { useState, Fragment } from 'react'
import styled, { css } from 'styled-components'
import LogoImage from '../assets/logo.png'
import SilentLink from './SilentLink'
import SearchBar from './SearchBar'
import Menu from './Menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import config from '../config'

function randomFromArray (arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const desktopTagline = randomFromArray(config.desktopTaglines)
const mobileTagline = randomFromArray(config.mobileTaglines)

const TopBarStyled = styled.div`
  position: fixed;
  width: 100%;
  height: 55px;
  background-color: #323232;
  z-index: 2;
`

const Tagline = styled.div`
  position: absolute;
  left: 50%; top: 50%;
  transform: translateX(-50%) translateY(-50%);
  ${props => !props.mobile && css`
    font-style: italic;
  `}

  @media (${props => props.mobile ? 'min' : 'max'}-width: 425px) {
    display: none;
  }
`

const Logo = styled.div`
  background-image: url(${LogoImage});
  background-size: contain;
  background-repeat: no-repeat;
  height: calc(100% - 28px);
  width: 200px;
  float: left;
  position: relative;
  top: 14px; left: 15px;
`

const RightAlign = styled.div`
  text-align: right;
  float: right;
  height: 100%;
`

const RightIcon = styled(FontAwesomeIcon)`
  font-size: 25px;
  position: relative;
  top: 15px;
  margin-right: 10px;
  cursor: pointer;
`

const TopBar = (props) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <TopBarStyled>
      <SilentLink to='/'><Logo /></SilentLink>

      {
        config.disableTaglines ? null :
          <Fragment>
            <Tagline>{desktopTagline}</Tagline>
            <Tagline mobile>{mobileTagline}</Tagline>
          </Fragment>
      }

      <RightAlign>
        <RightIcon
          icon='search'
          onClick={() => {
            setSearchOpen(!searchOpen)
            setMenuOpen(false)
          }} />
        <RightIcon
          icon='bars'
          onClick={() => {
            setMenuOpen(!menuOpen)
            setSearchOpen(false)
          }} />
      </RightAlign>

      {
        searchOpen ? <SearchBar hideSearch={() => setSearchOpen(false)} /> : null
      }
      {
        menuOpen ? <Menu closeMenu={() => setMenuOpen(false)} /> : null
      }
    </TopBarStyled>
  )
}

export default TopBar
