// ------------------------------------
// Constants
// ------------------------------------
export const ADD_TODO = 'ADD_TODO'
export const COMPLETE_TODO = 'COMPLETE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const EDIT_TODO = 'EDIT_TODO'
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED'
export const COMPLETED_ALL = 'COMPLETED_ALL'

// ------------------------------------
// Actions
// ------------------------------------
export function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}

export function clearCompleted() {
  return {
    type: CLEAR_COMPLETED
  };
}

export function completeTodo (id) {
  return {
    type: COMPLETE_TODO,
    id
  }
}

export function editTodo (id,text) {
  return {
    type: EDIT_TODO,
    id,
    text
  }
}

export function deleteTodo (id) {
  return {
    type: DELETE_TODO,
    id
  }
}

export function completeAll () {
  return {
    type: COMPLETED_ALL
  }
}

export const actions = {
  addTodo,
  editTodo,
  clearCompleted,
  completeTodo,
  deleteTodo,
  completeAll
}


// ------------------------------------
// Action Handlers
// ------------------------------------
let todoId = 0
const ACTION_HANDLERS = {
  [ADD_TODO]: (state, action) => {
    return [
      ...state,
      {
        id:todoId++,
        text:action.text,
        completed: false
      }
    ]
  },
  [COMPLETE_TODO]:(state,action) => {
    return state.map(todo =>
     todo.id === action.id ?
      Object.assign({}, todo, { completed: !todo.completed }) : todo)
  },
  [DELETE_TODO]:(state,action) => {
    return state.filter((todo) => todo.id !== action.id)
  },
  [EDIT_TODO]:(state,action) => {
    return state.map(todo =>
      todo.id === action.id ?
         Object.assign({}, todo, { text: action.text }) : todo)
  },
  [CLEAR_COMPLETED]: (state, action) => {
      return state.filter((todo) => !todo.completed)
  },
  [COMPLETED_ALL]: (state,action) => {
    // debugger
    const areAllMarked = state.every(todo => todo.completed)
    console.log('123',areAllMarked);
    // debugger
    return state.map(todo => Object.assign({}, todo, {
      completed: !areAllMarked
    }))
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []

export default function todoList (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
