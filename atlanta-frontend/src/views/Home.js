import React, { Component } from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import VideoListing from '../components/VideoListing'
import api from '../lib/api'
import DocumentMeta from 'react-document-meta'
import config from '../config'
import isScrollLowEnough from '../lib/scrollReload'

const SectionTitle = styled.strong`
  font-size: 18px;
  display: block;
`

class HomeView extends Component {
  constructor (props) {
    super(props)

    this.batchSize = 20
    this.justBatched = false
    this.state = {
      loading: false,
      apiError: false,
      videos: [],
      offset: 0
    }
  }

  scrollBatchCheck () {
    if (isScrollLowEnough) {
      this.loadNewBatch()
    }
  }

  componentDidMount () {
    this.loadNewBatch()
    window.addEventListener('scroll', this.scrollBatchCheck.bind(this))
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollBatchCheck.bind(this))
  }

  loadNewBatch () {
    this.setState({
      loading: true
    })
    api.get(`/discovery/top?offset=${this.state.offset}`)
      .then(response => {
        if (!response.data.success) {
          return this.setState({
            loading: false,
            apiError: true
          })
        }
        this.setState({
          loading: false,
          videos: this.state.videos.concat(response.data.results),
          offset: this.state.offset + this.batchSize
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

  render () {
    return (
      <DocumentMeta title={`${config.siteName} - Home`}>
        <ViewWrapper>
          <SectionTitle>
            {
                this.state.apiError ? 'Error, try refreshing' : 'Most popular'
            }
          </SectionTitle>

          {
            this.state.videos.map((v, i) => (
              <VideoListing key={i} {...v} />
            ))
          }

          {
            this.state.loading ?
              <div style={{ marginTop: 15 }}>Loading...</div> : ''
          }
        </ViewWrapper>
      </DocumentMeta>
    )
  }
}

export default HomeView
