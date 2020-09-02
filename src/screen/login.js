import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { connect } from 'react-redux';

import { login_user } from '../actions/auth'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email   : "",
      password: "",
      isValidE: true,
      isValidP: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(isEmail, text) {
    if (isEmail) {
      this.setState({
        email: text,
      });
    }
    else {
      this.setState({
        password: text,
      });
    }
  }

  ValidateEmail(email) {
    //Fui Buscar esta expressão a internet
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return String(email).length > 12 && expression.test(String(email).toLowerCase())
  }

  ValidatePassw(passw) {
    return passw.length > 8;
  }

  handleSubmit() {
    //Before dispatch to store the new state lets validate informatiom
    let isValidEmail = this.ValidateEmail(this.state.email)
    let isValidPassw = this.ValidatePassw(this.state.password);
    if (isValidEmail && isValidPassw) {
      const { login } = this.props;
      login({ email: this.state.email });
      this.props.navigation.replace('Todos')
    }
    this.setState(
      {
        isValidE: isValidEmail,
        isValidP: isValidPassw,
      }
    );
  }

  render() {
    let msgE = "", msgP = "";
    if (!this.state.isValidE)
      msgE = "Supplied email is not valid";
    
    if (!this.state.isValidP)
      msgP = "Password is to Short";


    return (
      <View>
        <Input
          name="email"
          placeholder="your email"
          label="Email:"
          textAlign="center"
          textContentType="emailAddress"
          errorMessage={msgE}
          onChangeText={(text) => this.handleChange(true, text)}
        /> 
        <Input
          placeholder="your password"
          label="Password:"
          secureTextEntry={true}
          textAlign="center" 
          errorMessage={msgP}
          onChangeText={(text) => this.handleChange(false, text)}
          /> 
        <Button
          title="Submit"
          color="red"
          onPress={this.handleSubmit}
        />
      </View>
    );
  }
}

function mapDispatchProps(dispatch) {
  return {
    login: (payload) => dispatch(login_user(payload)),
  };
}

function mapStateToProps(state) {
  const { logged_in } = state;
  return (
    {
      islogged : logged_in,
    }
  );
}

export default connect(mapStateToProps, mapDispatchProps)(LoginScreen);