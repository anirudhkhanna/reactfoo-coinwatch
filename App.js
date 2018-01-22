import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Settings from './Settings';

const RootNavigator = new StackNavigator({
  Home: {
    screen: Home
  },
  Settings: {
    screen: Settings
  }
});

export default RootNavigator;
