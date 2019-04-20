/*------------------- middelware ---------------------------------- */

/*
 * Side effect middelware like thunk
 * @param sideEffects 
 */
var sideEffectMiddelware = sideEffects => store => next => action => {
  if (
    sideEffects[action.type] &&
    typeof sideEffects[action.type] === "function"
  ) {
    sideEffects[action.type](action, store.dispatch, store.getState());
  }
  next(action);
};

var loggerMiddelware = store => next => action => {
  console.log(action);
  next(action);
};

/*-------------------------------------------------------------------------------------- */

/**
 * Takes store 
 * @param {Store} store 
 */
function connect(store) {
    /**
     * takes components
     */
  return function(components) {
    return components.map(component => {
      return new (component.name)(store, ...component.props);
    });
  };
}
