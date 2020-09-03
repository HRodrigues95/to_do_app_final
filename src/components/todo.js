import React, { Component } from 'react';
import { View, Modal, Alert, StyleSheet } from 'react-native';
import { Button, Text, Input, Card } from 'react-native-elements';

import { connect } from 'react-redux';
import { update_todo, remove_todo } from '../actions/todos';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: props.todo,
    }

    this.handleDone = this.handleDone.bind(this);
  }

  handleDone() {
    const { update } = this.props;
    const { todo   } = this.state;
    update({
      id: todo.id,
    })
    todo.done = true;
    this.setState({
      todo: todo,
    });
  }

  render() {
    const { todo } = this.state;
    let btn =
      <Button
        onPress={this.handleDone}
        title  ="Done"
      />;
    if (todo.done) {
      btn = <Text>Task Done</Text>
    }

    return (
      <Card containerStyle={{width:250}}>
        <Card.Title>{todo.title}</Card.Title>
        <Card.Divider />
        <View>
          <Text>Description:{todo.description}</Text>
          <Text>{todo.date.toString()}</Text>
        </View>
        <Card.Divider />
        <View>
          {btn}
          <Button
            onPress={() => this.props.remove(todo.id)}
            title="Remove"
          />
        </View>
      </Card>
    );
  }
}

function mapStateToProps({ Todos, Auth}) {
  const { logged_in } = Auth;
  const { todos } = Todos;
  return (
    {
      isLogged: logged_in,
      allTodos: todos,
    }
  );
}

function mapDispatchToProps(dispatch) {
  return {
    update: (payload) => dispatch(update_todo(payload)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Todo);