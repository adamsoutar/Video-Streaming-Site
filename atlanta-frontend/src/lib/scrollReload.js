import config from '../config'

function isScrollLowEnough () {
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  const body = document.body,
    html = document.documentElement

  const documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight)

  const scrollAmount = window.pageYOffset

  return (viewHeight + scrollAmount > documentHeight - config.scrollBatchAcceptance)
}

export default isScrollLowEnough
