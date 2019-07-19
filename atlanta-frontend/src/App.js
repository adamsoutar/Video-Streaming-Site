import React, { Component } from 'react'
import TopBar from './components/TopBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import HomeView from './views/Home'
import VideoView from './views/Video'
import SearchView from './views/Search'
import UploadView from './views/Upload'
import ErrorView from './views/Error'
import AboutView from './views/About'
import TagsView from './views/Tags'
import icons from './lib/icons' // eslint-disable-line

/* For dev usage */
import config from './config'
window.atlanta = {}
if (config.exposeConfig) {
  window.atlanta.config = config
}
/* End for dev */

const TopBarSpacer = styled.div`
  height: 65px;
`

class App extends Component {
  render() {
    return (
      <Router>
        <TopBar />
        <TopBarSpacer />

        <Switch>
          <Route path='/' exact component={HomeView} />
          <Route path='/video/:videoId' component={VideoView} />
          <Route path='/search/:searchTerm' component={SearchView} />
          <Route path='/upload' component={UploadView} />
          <Route path='/about' component={AboutView} />
          <Route path='/tags' component={TagsView} />

          <Route component={ErrorView} />
        </Switch>
      </Router>
    )
  }
}

export default App
