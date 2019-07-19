import React from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import config from '../config'
import DocumentMeta from 'react-document-meta'

const SectionTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`
const SilentA = styled.a`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
`

const ErrorView = (props) => (
  <DocumentMeta title={`${config.siteName} - About`}>
    <ViewWrapper>
      <SectionTitle>About {config.siteName}</SectionTitle>
      {config.siteName} was created by {config.companyName}.
      They don't enjoy filling out about pages so this one is very short.<br />
      <br />
      If you need to contact us, do so <SilentA href={`mailto:${config.contactEmail}`}>here</SilentA>,
      but keep it brief. If you've got a DMCA complaint, we'll be happy to hear it,
      but our content is uploaded by - and remains the property of - our users.
    </ViewWrapper>
  </DocumentMeta>
)

export default ErrorView
