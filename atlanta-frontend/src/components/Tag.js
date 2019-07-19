import React from 'react'
import SilentLink from './SilentLink'
import styled from 'styled-components'

const TagStyled = styled.div`
  display: inline-block;
  border-radius: 3px;
  background-color: #5391A5;
  padding: 3px;
  font-size: 13px;
  font-weight: bold;
  color: white;
  margin-left: ${props => props.first ? '0' : '5px'};
`

const Tag = (props) => (
  <SilentLink to={`/search/${props.name}`}>
    <TagStyled first={props.first} style={props.style}>
      {props.name}
    </TagStyled>
  </SilentLink>
)

export default Tag
