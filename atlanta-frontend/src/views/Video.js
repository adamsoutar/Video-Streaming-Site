import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import api from '../lib/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import VideoListing from '../components/VideoListing'
import Player from '../components/Player'
import Tag from '../components/Tag'
import DocumentMeta from 'react-document-meta'
import config from '../config'

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`

const AboutHalf = styled.div`
  float: left;
  width: 50%;
`

const Description = styled.div`
  background-color: #262626;
  width: calc(100% - 20px);
  padding: 10px;
  color: #D2D2D2;
`

const AlsoText = styled.div`
  margin-top: 15px;
`

const IconLine = styled.div`
  background-color: #1B1B1B;
  color: #06C3FF;
  height: 20px;
  width: calc(100% - 20px);
  line-height: 20px;
  padding: 10px;
`

class VideoView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      apiError: false,
      video: {},
      suggestions: []
    }
  }

  repopulateState () {
    let videoId = this.props.match.params.videoId

    this.setState({
      loading: true
    })
    api.get(`/details/video?id=${videoId}`)
      .then(response => {
        if (!response.data.success) {
          return this.setState({
            loading: false,
            apiError: true
          })
        }
        this.setState({
          loading: false,
          video: response.data.video,
          suggestions: response.data.suggestions
        })
      })
      .catch(response => {
        this.setState({
          loading: false,
          apiError: true
        })
        console.log(response)
      })
  }

  componentDidMount () {
    this.repopulateState()
  }

  componentDidUpdate (prevProps) {
    // Did we change page?
    if (prevProps.match !== this.props.match) this.repopulateState()
  }

  render () {
    return (
      <DocumentMeta title={`${config.siteName} - ${
        this.state.apiError ?
          'Error' : this.state.loading ?
            'Loading' : this.state.video.title
      }`}>
        <ViewWrapper>
          {
            this.state.apiError ?
              <SectionTitle>Error, try refreshing</SectionTitle> :
              this.state.loading ?
                <SectionTitle>Loading...</SectionTitle> :
                <Fragment>
                  <SectionTitle>{this.state.video.title}</SectionTitle>

                  <Player controls>
                    <source
                      src={this.state.video.videoURL}
                      type={this.state.video.videoMimeType} />
                  </Player>

                  <IconLine>

                    <AboutHalf>
                      <FontAwesomeIcon icon='eye' style={{ marginRight: 10 }}/>
                      <strong>{this.state.video.views}</strong>
                    </AboutHalf>

                    <AboutHalf style={{ textAlign: 'right' }}>
                      <a href={this.state.video.videoURL} style={{ color: 'inherit' }}>
                        <FontAwesomeIcon icon='cloud-download-alt'/>
                      </a>
                    </AboutHalf>

                  </IconLine>

                  <Description>
                    <div
                      style={{ marginBottom: 10 }}>
                      {this.state.video.description}
                    </div>

                    {
                      this.state.video.tags ?
                        this.state.video.tags.map((t, i) => (
                          <Fragment key={i}>
                            {
                              i < 4 ?
                                <Tag first={i === 0} name={t}>
                                  </Tag> :
                                null
                            }
                          </Fragment>
                        )) : null
                    }
                  </Description>

                  <AlsoText>
                    {
                      this.state.suggestions.length > 0 ?
                        'You might also like' : ''
                    }
                  </AlsoText>

                  {
                    this.state.suggestions.map((s, i) => (
                      <VideoListing key={i} {...s} />
                    ))
                  }
                </Fragment>
          }
        </ViewWrapper>
      </DocumentMeta>
    )
  }
}

export default VideoView
