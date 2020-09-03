import { ADD, REMOVE, UPDATE, add_todo } from '../actions/todos'

const initialstate = {
  autoInc : 0,
  todos : [],
}

function TodosReducer(state = initialstate, action) {
  switch (action.type) {
    case ADD:
      {
        const { title, descp, dated } = action.payload;
        const { autoInc, todos } = state;
        todos.push({
          id: autoInc,
          title: title,
          description: descp,
          date: dated,
          done:false,
        })
        return {...state, autoInc: autoInc+1, todos:todos  }
      }
      break;
    case REMOVE:
      {
        const { id } = action.payload;
        const { todos } = state;
        let pos = todos.indexOf(t => t.id === id);
        todos.splice(pos, 1);
        return {...state, todos:todos }
      }
      break;
    case UPDATE:
      {
        const { id } = action.payload;
        const { todos } = state;

        todos.find(t => t.id === id).done = true;

        return {...state, todos:todos }
      }
    default:
      return state;
  }
}

export default TodosReducer;