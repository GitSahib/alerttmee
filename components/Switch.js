import React from 'react';
import { Switch, Platform } from 'react-native';

import alerttmeeTheme from '../constants/Theme';

class MkSwitch extends React.Component {
  render() {
    const { value, ...props } = this.props;
    const thumbColor = Platform.OS === 'ios' ? null :
      Platform.OS === 'android' && value ? alerttmeeTheme.COLORS.SWITCH_ON : alerttmeeTheme.COLORS.SWITCH_OFF;

    return (
      <Switch
        value={value}
        thumbColor={thumbColor}
        ios_backgroundColor={alerttmeeTheme.COLORS.SWITCH_OFF}
        trackColor={{ false: alerttmeeTheme.COLORS.SWITCH_ON, true: alerttmeeTheme.COLORS.SWITCH_ON }}
        {...props}
      />
    );
  }
}

export default MkSwitch;