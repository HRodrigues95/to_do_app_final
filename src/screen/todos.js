import React, { Component } from 'react';
import { View, Modal, StyleSheet} from 'react-native';
import { Button, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

import { connect } from 'react-redux';

import { add_todo, remove_todo } from '../actions/todos';
import Todo from '../components/todo';
import { ScrollView } from 'react-native-gesture-handler';

class TodosScreen extends Component {
  constructor(props) {
    super(props);
    const { todos } = this.props;
    this.state = {
      todos: todos,
      showM: false,
      todo: {
        title: "",
        descp: "",
        dated: new Date(),
      },
    }
    this.addButton = this.addButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  handleAdd() {
    this.setState(
      {
        showM:true,
      }
    );
  }

  handleChange(isT, text) {
    const { todo } = this.state;
    if (isT) {
      this.setState({
        todo: {
          title: text,
          descp: todo.descp,
          dated: todo.dated,
        },
      });
    }
    else {
      this.setState({
        todo: {
          title: todo.title,
          descp: text,
          dated: todo.dated,
        },
      });
    }
  }

  handleDate(e, date) {
    console.log(date);
    const { todo } = this.state;
    this.setState({
      todo: {
        title: todo.title,
        descp: todo.descp,
        dated: date,
      },
    });
  }

  handleCreate() {
    const { todo } = this.state;
    const { create } = this.props;
    create(todo);
    this.setState({
      showM:false,
      todo: {
        title: "",
        descp: "",
        dated: new Date(),
      },
    });
    this.setState({
      todos: this.props.todos,
    });
  }

  removeTodo(id) {
    const { remove } = this.props;
    remove({
      id: id,
    });
    this.setState({
      todos: this.props.todos,
    });
  }

  addButton() {
    return (
      <Button
        onPress={() => { this.handleAdd() }}
        title  ="New"
      />
    );
  }

  renderModal() {
    const { showM, todo } = this.state;
    let data = new Date();

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showM}
      >
        <View>
          <View style={styles.modalView}>
            <Input
              placeholder="To Do Title"
              label="Title:"
              textAlign="center"
              onChangeText={(text) => this.handleChange(true, text)}
            />
            <Input
              placeholder="Description"
              multiline={true}
              maxLength={127}
              onChangeText={(text) => this.handleChange(false, text)}
            />
            <DateTimePicker
              value={todo.dated}
              mode='date'
              display='inline'
              onChange={this.handleDate}
              style={{ width: '100%' }}
            />
            <Button
              title="Create"
              color="red"
              onPress={this.handleCreate}
            />
            <Button
              onPress={() => {
                this.setState({
                  showM: false,
                  todo: {
                    title: "",
                    descp: "",
                  },
                });
              }}
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
    );
  }

  renderTodoList() {
    const { todos } = this.state;
    let sl = [];
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
      sl.push(<Todo key={todo.id} todo={todo} remove={(id) => this.removeTodo(id)} />)
    }
    return sl;
  }

  componentDidMount() {
    const { navigation } = this.props;
    if (!this.props.isLogged) {
      navigation.replace('Login');
    }
    else {
      navigation.setOptions(
        {
          headerRight: this.addButton,
        }
      );
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.centeredScroll}>
        {this.renderModal()}
        {this.renderTodoList()}
      </ScrollView>
    );
  }
}

function mapStateToProps({ Auth, Todos }) {
  const { todos } = Todos;
  const { logged_in } = Auth;
  return (
    {
      isLogged: logged_in,
      todos   : todos,
    }
  );
}

function mapDispatchToProps(dispatch) {
  return {
    create: (payload) => dispatch(add_todo(payload)),
    remove: (payload) => dispatch(remove_todo(payload)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TodosScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  centeredScroll: {
    alignItems: "center",
    marginTop: 22,
    paddingBottom: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});