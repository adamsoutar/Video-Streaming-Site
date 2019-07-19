import React from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import SilentLink from '../components/SilentLink'
import DocumentMeta from 'react-document-meta'
import config from '../config'

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`

const ErrorView = (props) => (
  <DocumentMeta title={`${config.siteName} - Error`}>
    <ViewWrapper>
      <SectionTitle>Page not found</SectionTitle>
      This site doesn't have a route under that URL.<br />
      Get back on track using the menu, or by returning
      <strong><SilentLink to='/'> home</SilentLink></strong>
    </ViewWrapper>
  </DocumentMeta>
)

export default ErrorView
