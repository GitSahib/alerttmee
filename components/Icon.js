import React from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import alerttmeeConfig from '../assets/config/alerttmee.json';
const AlerttmeeExtra = require('../assets/font/alerttmee.ttf');
const IconAlerttmeeExtra = createIconSetFromIcoMoon(alerttmeeConfig, 'AlerttmeeExtra');

class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({ AlerttmeeExtra: AlerttmeeExtra });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, ...rest } = this.props;
    
    if (name && family && this.state.fontLoaded) {
      if (family === 'AlerttmeeExtra') {
        return <IconAlerttmeeExtra name={name} family={family} {...rest} />;
      }
      return <Icon name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
