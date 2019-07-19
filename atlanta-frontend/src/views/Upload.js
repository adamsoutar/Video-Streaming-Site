import React, { Component } from 'react'
import styled from 'styled-components'
import ViewWrapper from '../components/ViewWrapper'
import { Link } from 'react-router-dom'
import uploadApi from '../lib/uploadApi'
import DocumentMeta from 'react-document-meta'
import config from '../config'

const SectionTitle = styled.strong`
  display: block;
  font-size: 18px;
  padding-bottom: 10px;
`
const UploadInput = styled.input`
  width: 100%;
  margin: 0; padding: 0;
  border: 0;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,0.1);
  color: white;
  font-size: 20px;
`
const UploadTextarea = styled.textarea`
  width: 100%;
  margin: 0;
  background-color: rgba(0,0,0,0.1);
  color: white;
  border: 0;
  font-size: 20px;
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 300px;
  padding: 0;
  height: 100px;
  font-family: sans-serif;
`

const initialState = {
  uploading: false,
  uploadError: false,
  uploadDone: false,
  uploadedId: ''
}

class UploadView extends Component {
  constructor (props) {
    super(props)

    this.state = initialState

    this.titleRef = React.createRef()
    this.descriptionRef = React.createRef()
    this.tagsRef = React.createRef()
    this.videoRef = React.createRef()
  }

  beginUpload () {
    const fD = new FormData()
    fD.set('title', this.titleRef.current.value)
    fD.set('description', this.descriptionRef.current.value)
    fD.set('tags', this.tagsRef.current.value)
    fD.append('video', this.videoRef.current.files[0])

    this.setState({
      uploading: true
    })

    uploadApi({
      method: 'POST',
      url: '/upload',
      data: fD,
      config: {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    })
      .then((response) => {
        console.log(response)
        this.setState({
          uploadDone: true,
          uploading: false,
          uploadedId: response.data.videoId
        })
      })
      .catch((response) => {
        console.log(response)
        this.setState({
          uploadError: true,
          uploading: false
        })
      })
  }

  render () {
    if (this.state.uploadError) return (
      <ViewWrapper>
        <SectionTitle>Something went wrong</SectionTitle>
        <div>Your upload failed.</div>
        <button onClick={() => this.setState(initialState)}>Try again</button>
      </ViewWrapper>
    )

    if (this.state.uploading) return (
      <ViewWrapper>
        <SectionTitle>Uploading...</SectionTitle>
        <div>Please wait</div>
      </ViewWrapper>
    )

    if (this.state.uploadDone) return (
      <ViewWrapper>
        <SectionTitle>Upload complete.</SectionTitle>
        <div>Your video can be found <Link style={{
          color: 'white'
        }} to={`/video/${this.state.uploadedId}`}>here</Link></div>
      </ViewWrapper>
    )

    return (
      <DocumentMeta title={`${config.siteName} - Upload`}>
        <ViewWrapper>
          <SectionTitle>Upload a video</SectionTitle>
          <UploadInput type='text' placeholder='title' ref={this.titleRef}/>
          <UploadTextarea placeholder='description' ref={this.descriptionRef}></UploadTextarea>
          <UploadInput type='text' placeholder='tag1,tag2' ref={this.tagsRef}/>
          <input style={{display: 'block', marginBottom: '10px'}} type='file' ref={this.videoRef}/>
          <button onClick={this.beginUpload.bind(this)}>Upload</button>
        </ViewWrapper>
      </DocumentMeta>
    )
  }
}

export default UploadView
