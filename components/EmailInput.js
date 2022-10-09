import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';

import { Input } from "galio-framework";

import Icon from './Icon';
import { alerttmeeTheme } from "../constants";

class EmailInput extends React.Component {
  render() {
    const { shadowless, success, error } = this.props;

    const inputStyles = [
      styles.input,
      !shadowless && styles.shadow,
      success && styles.success,
      error && styles.error,
      {...this.props.style}
    ];

    return (
      <Input
        placeholder="write something here"
        placeholderTextColor={alerttmeeTheme.COLORS.MUTED}
        style={inputStyles}
        color={alerttmeeTheme.COLORS.HEADER}
        placeholder="Email"
        extContentType="emailAddress"
        keyboardType="email-address"
        iconContent={
          <Icon
            size={14}
            color={alerttmeeTheme.COLORS.ICON}
            name="link"
            family="AntDesign"
          />
        }
        {...this.props}
      />
    );
  }
}

EmailInput.defaultProps = {
  shadowless: false,
  success: false,
  error: false
};

EmailInput.propTypes = {
  shadowless: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 4,
    borderColor: alerttmeeTheme.COLORS.BORDER,
    height: 44,
    backgroundColor: '#FFFFFF'
  },
  success: {
    borderColor: alerttmeeTheme.COLORS.INPUT_SUCCESS,
  },
  error: {
    borderColor: alerttmeeTheme.COLORS.INPUT_ERROR,
  },
  shadow: {
    shadowColor: alerttmeeTheme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.05,
    elevation: 2,
  }
});

export default EmailInput;
