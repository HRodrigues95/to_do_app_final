export const ADD = "ADD_TODO";
export function add_todo(payload) {
  return {
    type: ADD,
    payload,
  }
}

export const REMOVE = "REM_TODO";
export function remove_todo(payload) {
  return {
    type: REMOVE,
    payload,
  }
}

export const UPDATE = 'UPD_TODO';
export function update_todo(payload) {
  return {
    type: UPDATE,
    payload,
  };
}
