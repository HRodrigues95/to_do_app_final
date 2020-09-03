export const ADD = "ADD_TODO";
export function add_todo() {
  return {
    type: ADD,
  }
}

export const REMOVE = "REM_TODO";
export function remove() {
  return {
    type: REMOVE,
  }
}

export const UPDATE = 'UPD_TODO';
export function update() {
  return {
    type: UPDATE,
  };
}

export const ALL = 'ALL_TODO'
export const get_all = () => ({
  type: ALL,
})

export const RECEIVE = 'RECEIVE_TODOS'
export const receive_todos = (list_td) => (
  {
    type: RECEIVE,
    list: list_td,
  }
)

export function fetchTodos() {
  return function (dispatch) {
    dispatch(get_all())

    return fetch('http://localhost:3000/todons').then(
      response => response.json()
    ).then(json => {
      dispatch(receive_todos(json))
    })
  }
}

export function create_todo(todo) {
  return function (dispatch) {
    dispatch(add_todo())

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: todo.title,
        description: todo.descp,
        end: todo.dated,
      })
    }

    return fetch('http://localhost:3000/todons', options).then(
      response => response.json()
    ).then((json) => {
      dispatch(fetchTodos())
    })
  }
}

export function update_todo(id) {
  return function (dispatch) {
    dispatch(update())

    const options = {
      method: 'PUT',
    }

    return fetch(`http://localhost:3000/todons/${id}`, options).then(
      response => response.json()
    ).then(() => {
      dispatch(fetchTodos())
    })
  }
}

export function remove_todo(id) {
  return function (dispatch) {
    console.log(id);
    dispatch(remove())

    const options = {
      method: 'DELETE',
    }

    return fetch(`http://localhost:3000/todons/${id}`, options).then(
      response => { 
        if (response.ok) {
          dispatch(fetchTodos())
        }
      }
    )
  }
}