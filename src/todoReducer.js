export const ACTIONS = {
  TOGGLE_CHECKED: 'TOGGLE_CHECKED',
  DELETE_TODO: 'DELETE_TODO',
  ADD_TODO: 'ADD_TODO',
  FILTER_TODOS: 'FILTER_TODOS',
  TOGGLE_HIDE_COMPLETED: 'TOGGLE_HIDE_COMPLETED',
  TOGGLE_EDIT: 'TOGGLE_EDIT',
  EDIT_TODO: 'EDIT_TODO',
  TOGGLE_PIN: 'TOGGLE_PIN',
};

export function todoReducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TODO: {
      return {
        ...state,
        todos: [
          {
            id: Date.now(),
            name: payload.name,
            checked: false,
            isPinned: false,
          },
          ...state?.todos,
        ].sort(sortTodos),
      };
    }
    case ACTIONS.EDIT_TODO: {
      return payload.name === ''
        ? {
            ...state,
            todos: state.todos.filter((todo) => todo.id !== payload.id),
          }
        : {
            ...state,
            todos: state.todos.map((todo) =>
              todo.id === payload.id
                ? { ...todo, name: payload.name, isEdit: false }
                : todo
            ),
          };
    }
    case ACTIONS.DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== payload.id),
      };
    }
    case ACTIONS.FILTER_TODOS: {
      return {
        ...state,
        query: payload.query,
      };
    }
    case ACTIONS.TOGGLE_CHECKED: {
      return {
        ...state,
        todos: state.todos
          .map((todo) =>
            todo.id === payload.id
              ? {
                  ...todo,
                  checked: !payload.checked,
                  completedAt: Date.now(),
                  isPinned: !payload.checked ? false : todo.isPinned,
                }
              : todo
          )
          .sort(sortTodos),
      };
    }
    case ACTIONS.TOGGLE_HIDE_COMPLETED: {
      return {
        ...state,
        hideCompleted: payload.checked,
      };
    }
    case ACTIONS.TOGGLE_EDIT: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === payload.id
            ? { ...todo, isEdit: !payload.isEdit }
            : { ...todo, isEdit: false }
        ),
      };
    }
    case ACTIONS.TOGGLE_PIN: {
      return {
        ...state,
        todos: state.todos
          .map((todo) =>
            todo.id === payload.id
              ? { ...todo, isPinned: !payload.isPinned, pinTime: Date.now() }
              : { ...todo }
          )
          .sort(sortTodos),
      };
    }
    default: {
      return state;
    }
  }
}

function sortTodos(a, b) {
  if (a.isPinned === true && b.isPinned === true) {
    return b.pinTime - a.pinTime;
  }

  if (a.isPinned === true && b.isPinned === false) {
    return -1;
  }

  if (a.isPinned === false && b.isPinned === true) {
    return 1;
  }

  if (a.checked === false && b.checked === false) {
    return b.id - a.id;
  }

  if (a.checked === false && b.checked === true) {
    return -1;
  }

  if (a.checked === true && b.checked === false) {
    return 1;
  }

  if (a.checked === true && b.checked === true) {
    return b.completedAt - a.completedAt;
  }

  {
    return 0;
  }
}
