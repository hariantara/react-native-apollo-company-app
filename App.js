/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';

// redux dependency
import { Provider } from 'react-redux';

// react-apollo dependency
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import App from './src/App';
import store from './src/store';

const link = createHttpLink({
  uri: 'http://localhost:3000/graphql',  
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
);
