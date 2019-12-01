import React, { useState, useEffect, useContext } from "react";

const ReduxContext = React.createContext();

export const ReduxProvider = props => {
  let [state, setState] = useState(props.store.getState());

  useEffect(
    () => {
      // returns unsubscribe
      return props.store.subscribe(setState);
    },
    [props.store]
  );

  return (
    <ReduxContext.Provider
      value={{
        state,
        dispatch: props.store.dispatch
      }}
    >
      {props.children}
    </ReduxContext.Provider>
  );
};

export function connect(mapStateToProps, mapDispatchToProps) {
  // It lets us inject component as the last step so people can use it as a decorator.
  // Generally you don't need to worry about it.
  return WrappedComponent => {
    // It returns a component
    return props => {
      let { state, dispatch } = useContext(ReduxContext);
      return (
        // that renders your component
        <WrappedComponent
          {...props}
          {...mapStateToProps(state, props)}
          {...mapDispatchToProps(dispatch, props)}
        />
      );
    };
  };
}

export default connect;
