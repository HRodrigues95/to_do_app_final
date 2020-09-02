import { combineReducers } from '@reduxjs/toolkit'
import AuthReducer from './auth'
import TodosReducer from './todos'

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Todos: TodosReducer,
})

export default rootReducer;