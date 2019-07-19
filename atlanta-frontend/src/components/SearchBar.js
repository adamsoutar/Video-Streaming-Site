import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

const SearchContainerStyled = styled.div`
  position: fixed;
  top: 55px;
  width: calc(100% - 20px);
  height: 35px;
  padding: 10px;
  background-color: #323232;
  z-index: 2;
`

const SearchInput = styled.input`
  width: calc(100% - 20px);
  height: 100%;
  padding: 0; margin: 0;
  border: 0;
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
`

class SearchBar extends Component {
  constructor (props) {
    super(props)
    this.inputRef = React.createRef()
  }

  searchKeyHandler (e) {
    if (e.key === 'Enter') {
      this.props.history.push(`/search/${e.target.value}`)
      this.props.hideSearch()
    }
  }

  componentDidMount () {
    this.inputRef.current.focus()
  }

  render () {
    return (
      <SearchContainerStyled>
        <SearchInput
          onKeyDown={this.searchKeyHandler.bind(this)}
          ref={this.inputRef}
          placeholder='Search tags, titles & descriptions' />
      </SearchContainerStyled>
    )
  }
}

export default withRouter(SearchBar)
