/**----------------------------------------------------------------------------------------- */

var todoTextBox = function TodoTextBox(store, selector) {
  this.selector = selector;
  this.store = store;
  this.onChange = this.onChange.bind(this);
  $(this.selector).change(this.onChange);
};

todoTextBox.prototype.value = function() {
  return $(this.selector).val();
};

todoTextBox.prototype.onChange = function() {
  var value = this.value();
  this.store.dispatch({ type: actionTypes.VALUE_CHANGED, payload: value });
};

/**----------------------------------------------------------------------------------------- */

var todoAddButton = function TodoAddButton(store, selector) {
  this.selector = selector;
  this.store = store;
  this.onClick = this.onClick.bind(this); 
  $(this.selector).click(this.onClick);
};

todoAddButton.prototype.onClick = function() {
  var state = this.store.getState();
  this.store.dispatch({ type: actionTypes.TODO_ADDED, payload: state.text });
};

/**----------------------------------------------------------------------------------------- */
var todoListBlock = function(store, selector) {
  this.selector = selector;
  this.store = store;
  this.checkAndDo = this.checkAndDo.bind(this);
  this.store.subscribe(this.checkAndDo);
};

todoListBlock.prototype.checkAndDo = function() {
  var todos = this.store.getState().todos.todos;
  this.render(todos);
};

todoListBlock.prototype.render = function(todos) {
  var lists = [];
  lists = todos.map(todo => {
    var el = document.createElement("span");
    el.innerHTML = `${todo} <br/>`;
    return el;
  });
  $(this.selector).append(lists);
};

var storeApp = function(store) {
  return function() {
    var components = [
        {name:todoTextBox,props:["#todo"]},
        {name:todoAddButton,props:["#addTodo"]},
        {name:todoListBlock,props:["#todoslist"]}
    ]
    connect(store)(components);
  };
};

$(document).ready(storeApp(appStore.store));
