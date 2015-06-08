/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

var TodoReact = require('./App/components/TodoReact.react');

var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('TodoReact', () => TodoReact);
