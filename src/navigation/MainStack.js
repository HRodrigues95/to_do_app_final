import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen, HomeScreen, TodosScreen } from '../screen'

const MainStack = createStackNavigator();

function MainNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Login" component={LoginScreen} />
      <MainStack.Screen
        name="Todos"
        component={TodosScreen} 
        
      />
    </MainStack.Navigator>
  );
}

export default MainNavigator;