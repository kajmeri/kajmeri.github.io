import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Img = styled.img`
  max-width: 100%;
  vertical-align: bottom;
`

const Image = ({ alt, onClick, src, ...props }) => <Img {...props} alt={alt} onClick={onClick} src={src} />

Image.propTypes = {
  alt: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string,
}

export default Image
