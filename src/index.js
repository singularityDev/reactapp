import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todos_Reducer from "./Actions_Reducers/todos_Reducer";
import loginsignup_Reducer from "./Actions_Reducers/loginsignup_Reducer";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

// import {
//   ApolloClient,
//   ApolloLink,
//   HttpLink,
//   concat,
//   InMemoryCache,
// } from "apollo-boost";

// const loginToken = useSelector((state) => state.login);
// console.log("Login Token from app", loginToken);
// const authMiddleware = new ApolloLink((operation, forward) => {
//   if (loginToken) {
//     operation.setContext({
//       headers: {
//         Authorization: `Bearer ${loginToken.token}`,
//       },
//     });
//   }
//   return forward(operation);
// });

// Apollo Client to connect to the server side GrapghQL queries and mutations
// const httpLink = new HttpLink({ uri: "http://localhost:5000/graphql" });
// const client = new ApolloClient({
//   link: concat(authMiddleware, httpLink),
//   cache: new InMemoryCache(),
// });

// Initial State of the data tree for the application
export const InitialStateTodos = {
  todos: [],
  error: null,
  loading: undefined,
};
export const InitialStateLogin = {
  token: null,
  userId: null,
  sessionExpiration: null,
};
// Defining store for our application which uses InitialState to begin with

// For multiple reducers we use the below commented method
const allReducers = combineReducers({
  todos: todos_Reducer,
  login: loginsignup_Reducer,
});
export const store = createStore(allReducers);

// store.subscribe(() => {
//   const loginstate = store.getState().login.login;
//   console.log("from loginstate subscription index ", loginstate);
// });
// Apollo Client to connect to the server side GrapghQL queries and mutations
const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

ReactDOM.render(
  // ApolloProvider that lets the components interact with the client
  <ApolloProvider client={client}>
    {/* Redux Provider that lets all ccomponents access the store which gets updated when useDispatch runs code inside Reducer's switch case */}
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
