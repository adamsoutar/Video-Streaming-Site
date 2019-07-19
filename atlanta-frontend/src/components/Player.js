/*
  Wraps HTML5 <video>
  And keeps it in 16:9 aspect ratio
*/

import React from 'react'
import styled from 'styled-components'

const Aspect1 = styled.div`
  width: 100%;
  /* 16:9 Aspect ratio */
  padding-top: 56.25%;

  position: relative;
`
const Aspect2 = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: black;
`
const VideoStyled = styled.video`
  display: block;
  width: 100%;
  height: 100%;
`

const AspectContainer = (props) => (
  <Aspect1>
    <Aspect2>
      {props.children}
    </Aspect2>
  </Aspect1>
)

const Player = (props) => (
  <AspectContainer>
    <VideoStyled {...props}>{props.children}</VideoStyled>
  </AspectContainer>
)

export default Player
