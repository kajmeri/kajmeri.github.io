import PropTypes from 'prop-types'
import styled from 'styled-components'

const Field = styled.div`
  position: relative;
  width: 100%;
`

const Label = styled.label`
  display: inherit;
  height: 0;
  visibility: hidden;
  width: 0;
`

const StyledInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::placeholder {
    color: '#8F949C';
  }

  &:focus {
    outline: 0;
  }
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

const Input = ({ autoCapitalize = 'on', label, required = false, type = 'text', ...props }) => {
  return (
    <Wrapper>
      {/* Need a label for accessibility purposes, but we are allowed to hide it...KA */}
      <Label htmlFor={label}>{label}</Label>
      <Field>
        <StyledInput {...props} autoCapitalize={autoCapitalize} id={label} required={required} type={type} />
      </Field>
    </Wrapper>
  )
}

Input.propTypes = {
  autoCapitalize: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
}

export default Input
