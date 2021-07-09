import PropTypes from 'prop-types'

const ResultStackApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

ResultStackApp.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default ResultStackApp
