import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import FilesSreen from './DirectoryContentSreen';

const Navigator = props => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>

      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="FilesScreen" component={FilesSreen} />



      {/* Screen outside the tab bar  */}
      <Stack.Group></Stack.Group>
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 42,
  },
  tabLabel: {
    fontSize: 12,
    paddingTop: 2,
    fontFamily: 'Roboto-Regular',
  },
});

const mapStateToProps = state => ({
  app: state.app,
  user: state.user,
});

export default Navigator
