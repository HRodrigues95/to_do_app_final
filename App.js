import 'react-native-gesture-handler';
import React, { Component }from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
  
import rootReducer from './src/reducers'
import MainNavigator from './src/navigation/MainStack'

const store = createStore(rootReducer, applyMiddleware( thunk ));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          {MainNavigator()}
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;