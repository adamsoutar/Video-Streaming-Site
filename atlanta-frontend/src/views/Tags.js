import React, { Component } from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import api from '../lib/api'
import Tag from '../components/Tag'
import DocumentMeta from 'react-document-meta'
import config from '../config'

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`

const initialState = {
  tags: [],
  loading: true,
  error: false
}

class TagsView extends Component {
  constructor (props) {
    super(props)

    this.state = initialState
    this.loadTags()
  }

  loadTags () {
    this.setState(initialState)
    api.get('/discovery/tags')
      .then((response) => {
        console.log(response)
        this.setState({
          loading: false,
          error: false,
          tags: response.data.tags
        })
      })
      .catch((response) => {
        console.log(response)
        this.setState({
          loading: false,
          error: true
        })
      })
  }

  render () {
    if (this.state.loading) {
      return (
        <ViewWrapper>
          <SectionTitle>Loading</SectionTitle>
          Please wait...
        </ViewWrapper>
      )
    }

    if (this.state.error) {
      return (
        <ViewWrapper>
          <SectionTitle>Error</SectionTitle>
          Something went wrong grabbing tags.<br />
          Refresh to try again.
        </ViewWrapper>
      )
    }

    return (
      <DocumentMeta title={`${config.siteName} - All tags`}>
        <ViewWrapper>
          <SectionTitle>Tags (A-Z)</SectionTitle>
          {
            this.state.tags.map((t, i) => (
              <Tag style={{
                marginLeft: i === 0 ? '0' : '10px',
                marginTop: '5px',
                fontSize: '16px'
              }} first={i === 0} name={t}></Tag>
            ))
          }
        </ViewWrapper>
      </DocumentMeta>
    )
  }
}

export default TagsView
