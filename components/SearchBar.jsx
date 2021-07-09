import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { CloseIcon, SearchIcon } from '@assets'
import { Image, Input } from '@components'

const CloseWrapper = styled.div`
  bottom: 3px;
  cursor: pointer;
  display: flex;
  padding: 10px;
  position: absolute;
  right: 10px;
`

const Wrapper = styled.div`
  align-items: center;
  background-color: #f3f5fb;
  border-radius: 20px;
  display: flex;
  padding: 7.5px 15px;
  position: relative;
  width: 80%;
  margin: 0 auto;

  input {
    flex: 1 0 auto;
    margin-left: 10px;
  }
`

const SearchBar = ({ autoFocus = false, handleClear, id, onChange, placeholder, searchInput, value, ...props }) => (
  <Wrapper id={id}>
    <Image alt='search icon' src={SearchIcon} />
    <Input {...props} autoFocus={autoFocus} label={placeholder} onChange={onChange} placeholder={placeholder} value={value} />
    {value.length > 0 && (
      <CloseWrapper onClick={handleClear}>
        <Image alt='close icon' src={CloseIcon} />
      </CloseWrapper>
    )}
  </Wrapper>
)

SearchBar.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  handleClear: PropTypes.func.isRequired,
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

export default SearchBar
