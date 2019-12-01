import React from "react";
import ReactDOM from "react-dom";
import { connect, ReduxProvider } from "./react-redux";
import store from "./store";

class App extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.increment();
    }, 3000);
    setTimeout(() => {
      this.props.increment();
    }, 6000);
    setTimeout(() => {
      this.props.decrement();
    }, 9000);
  }

  render() {
    return (
      <div className="App">
        <h1>Counter</h1>
        <h2>{this.props.counter}</h2>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    counter: state
  };
};

let mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch({ type: "INCREMENT" }),
    decrement: () => dispatch({ type: "DECREMENT" })
  };
};

let ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedApp />
  </ReduxProvider>,
  rootElement
);
