import React from 'react'
import styled from 'styled-components'
import SilentLink from './SilentLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Thumbnail = styled.div`
  height: 160px;
  background-color: black;
  margin-top: 15px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

const AboutArea = styled.div`
  background-color: #262626;
  height: 40px;
  width: calc(100% - 10px);
  padding: 5px;
`

const ListingWrapper = styled.div`
  /* Mobile-first styles */
  width: 100%;
  float: left;
  height: 225px;

  @media (min-width: 425px) {
    /* Desktop styles */
    width: calc(50% - 8px);

    &:nth-child(odd) {
      padding-left: 15px;
    }
  }

`

const AboutLine = styled.div`
  overflow: hidden;
  width: 100%;
  height: 50%;
`

const VideoListing = (props) => (
    <ListingWrapper {...props}>
      <SilentLink to={`/video/${props._id}`}>
        <Thumbnail src={props.thumbnailURL}/>

        <AboutArea>
          <AboutLine><strong>{props.title}</strong></AboutLine>
          <AboutLine style={{ color: '#06C3FF' }}>
            <FontAwesomeIcon style={{ paddingRight: 5 }} icon='eye' />
            <strong>{props.views}</strong>
          </AboutLine>
        </AboutArea>
      </SilentLink>
    </ListingWrapper>
)

export default VideoListing
