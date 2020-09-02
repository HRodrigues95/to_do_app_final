import React, { Component } from 'react';
import { View} from 'react-native';
import { Button, Text } from 'react-native-elements';

import { connect } from 'react-redux';

class HomeScreen extends Component {
  render() {
    const { isLogged, navigation } = this.props;
    let btnlog = null;
    if (!isLogged) {
      btnlog = (
        <Button
          title="Login, please!"
          onPress={
            () => {
              navigation.navigate('Login');
            }
          }
        />
      );
    }

    return (
      <View style={{ flex: 1, alignItems: 'center' }} >
        <Text h1>Welcome</Text>
        <Text h3>To a Simple To do App</Text>
        {btnlog}
        <Button
          title  ="Todos"
          onPress={
            () => {
              navigation.navigate('Todos');
            }
          }
        />
      </View>
    );
  }
}

function mapStateToProps({ Auth, Todos }) {
  const { logged_in } = Auth;
  return (
    {
      isLogged: logged_in,
    }
  );
}

export default connect(mapStateToProps)(HomeScreen);