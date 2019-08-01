/* eslint-disable indent */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'rebass';

const StyledCard = styled(Card)`
  width: ${props => (props.width ? props.width : '200px')};
  height: ${props => (props.height ? props.height : '55px')};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  margin-top: ${props =>
    props.marginTop || props.mt ? props.marginTop || props.mt : '17px'};
`;

const StyledInput = styled.input`
  color: ${props => (props.color ? props.color : '#000000')};
  outline: none;
  font-family: inherit;
  padding: ${props =>
    props.padding || props.p ? props.padding || props.p : '12px'};
  transition: all 0.25s linear;
  box-sizing: border-box;
  border: ${props => {
    if (props.error) {
      return props.errorBorder || '1px solid red';
    }
    return props.border || '1px solid #909090';
  }};
  ::-webkit-datetime-edit {
    opacity: ${props => props.value === '' && '0.6'};
  }
  background-color: ${props => props.background || props.bg};
  border-radius: ${props => (props.borderRadius ? props.borderRadius : '6px')};
  width: 100%;
  height: 100%;
  :hover {
    ::-webkit-datetime-edit {
      opacity: 1;
    }
    color: ${props =>
      props.colorHover ? props.colorHover : props.color || '#000000'};
    border: ${props => {
      if (props.error) {
        return props.errorBorder || '1px solid red';
      }
      return props.borderHover
        ? props.borderHover
        : props.border || '1px solid #000000';
    }};
    background-color: ${props =>
      props.backgroundHover
        ? props.backgroundHover
        : props.background || props.bg};
    cursor: text;
    ::placeholder {
      opacity: 1;
    }
  }
  :focus {
    outline-offset: 0;
    color: ${props =>
      props.colorFocus ? props.colorFocus : props.color || '#000000'};
    border: ${props => {
      if (props.error) {
        return props.errorBorder || '1px solid red';
      }
      return props.borderFocus
        ? props.borderFocus
        : props.border || '1px solid #2e66ff';
    }};
    background-color: ${props =>
      props.backgroundFocus
        ? props.backgroundFocus
        : props.background || props.bg};
    ::placeholder {
      opacity: 0;
    }
  }
`;

const StyledLegend = styled.legend`
  color: ${props => (props.labelColor ? props.labelColor : '#000000')};
  outline: none;
  pointer-events: none;
  font-size: 12px;
  transition: all 0.25s ease-in-out;
  position: absolute;
  box-sizing: border-box;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0;
`;

class TextField extends React.PureComponent {
  state = {
    focused: false,
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleBlur = () => {
    if (this.props.value) {
      this.setState({ focused: true });
    } else {
      this.setState({ focused: false });
    }
  };

  render() {
    const {
      type,
      name,
      value,
      label,
      labelColor,
      error,
      placeholder,
      ...props
    } = this.props;
    return (
      <StyledCard
        {...props}
        style={{ border: 'none' }}
        onBlur={this.handleBlur}
        onFocus={this.handleFocus}
      >
        <StyledLegend
          labelColor={labelColor}
          style={{
            opacity: `${this.state.focused || this.props.value ? 1 : 0}`,
            transform: `${
              this.state.focused || this.props.value
                ? 'translate(0, -14px)'
                : 'translate(10px, 0)'
            }`,
          }}
        >
          {label}
        </StyledLegend>
        <StyledInput
          {...props}
          error={error}
          name={name}
          placeholder={placeholder || label}
          type={type}
          value={value || ''}
          style={{
            height: '100%',
            width: '100%',
            margin: '0',
          }}
        />
      </StyledCard>
    );
  }
}

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default TextField;
