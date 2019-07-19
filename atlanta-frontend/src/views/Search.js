import React, { Component } from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import VideoListing from '../components/VideoListing'
import api from '../lib/api'
import DocumentMeta from 'react-document-meta'
import config from '../config'

const SectionTitle = styled.strong`
  font-size: 18px;
  display: block;
`

class SearchView extends Component {
  constructor (props) {
    super(props)

    this.batchSize = 20
    this.state = {
      loading: false,
      apiError: false,
      videos: [],
      offset: 0,
      searchTerm: ''
    }
  }

  componentDidMount () {
    this.loadNewBatch(true, this.props.match.params.searchTerm)
  }
  componentDidUpdate (prevProps) {
    // Did we change page?
    if (prevProps.match !== this.props.match)
      this.loadNewBatch(true, this.props.match.params.searchTerm)
  }

  loadNewBatch (clearAll, newTerm) {
    if (this.state.searchTerm !== newTerm) {
      this.setState({
        searchTerm: newTerm
      })
    }

    let videosArray = clearAll ? [] : this.state.videos
    this.setState({
      loading: true
    })
    api.get(`/search?offset=${this.state.offset}&term=${newTerm}`)
      .then(response => {
        if (!response.data.success) {
          return this.setState({
            loading: false,
            apiError: true
          })
        }
        this.setState({
          loading: false,
          videos: videosArray.concat(response.data.results),
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
      <DocumentMeta title={`${config.siteName} - Search results`}>
        <ViewWrapper>
          <SectionTitle>
            {
                this.state.apiError ?
                  'Error, try refreshing' :
                  `Results for '${this.state.searchTerm}'`
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

export default SearchView
