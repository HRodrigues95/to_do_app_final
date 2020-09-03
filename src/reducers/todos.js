import { ADD, REMOVE, UPDATE, ALL, RECEIVE } from '../actions/todos'

const initialstate = {
  autoInc : 0,
  todos: [],
  isfetching:false,
}

function TodosReducer(state = initialstate, action) {
  switch (action.type) {
    case ADD:
      {
        return {...state, isfetching: true }
      }
      break;
    case REMOVE:
      {
        return {...state, isfetching: true }
      }
      break;
    case UPDATE:
      {
        return {...state, isfetching: true }
      }
    case ALL:
      {
        return {...state, isfetching: true }
      }
    case RECEIVE:
      {
        const { list } = action;
        const todos = list.map((x) => ({ 
          id: x.id,
          title: x.title,
          description: x.description,
          date: x.end,
          done: x.done,
        }))
        return {...state, todos: todos, isfetching: false}
      }
    default:
      return state;
  }
}

export default TodosReducer;