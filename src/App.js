import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import firebase from "react-native-firebase";
import reducers from "./reducers";
import { loadPersistedState } from "./modules/localStorage";
import GroupList from "./components/common/GroupList";
import * as locations from "./reducers/locations";

import testState from "./testState";
import IncidentPage from "./components/pages/IncidentPage";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());
    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  render() {
    // load previous state in case of crash
    let persistedState = loadPersistedState();
    const store = createStore(
      reducers,
      testState,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ); // testState = persistedState in release

    return (
      <Provider store={store}>
        <View style={{flex: 1, borderWidth: 1}}>
          <IncidentPage />
        </View>
      </Provider>
    );
  }
}
