var actionTypes = {
  TODO_ADDED: "TODO_ADDED",
  VALUE_CHANGED: "VALUE_CHANGED"
};

var appStore = (function() {
  var todoInitial = {
    todos: []
  };

  function todoReducer(state = todoInitial, action) {
    switch (action.type) {
      case actionTypes.TODO_ADDED:
        let todos = [...state.todos, action.payload];
        return { ...state, ...{ todos } };
      default:
        return state;
    }
  }

  function textBoxReducer(state = "", action) {
    switch (action.type) {
      case actionTypes.VALUE_CHANGED:
        return action.payload;
      default:
        return state;
    }
  }

  var reducer = Redux.combineReducers({
    todos: todoReducer,
    text: textBoxReducer
  });

  var store = Redux.createStore(
    reducer,
    {},
    Redux.applyMiddleware(loggerMiddelware)
  );

  return {
    store: store
  };
})();
