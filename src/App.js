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
import { graphql } from 'react-apollo';
import { connect } from 'react-redux';
import gql from 'graphql-tag';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const CompanyCard = ({ item }) => (
  <View style={{ marginVertical: 10, paddingVertical: 20, paddingHorizontal: 30, backgroundColor: '#353535'}}>
    <Text style={{ color: '#FFFFFF', fontSize: 20 }}>{item.name}</Text>
    <View>
      {item.employees.map(e =>
        <Text key={e.id} style={{ color: 'yellow', fontSize: 18 }}>{e.name}</Text>
      )}
    </View>
  </View>
);

class App extends Component<{}> {
  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>COMPANY APP</Text>
        <View style={{ flex: 0.5 }}>
          {!data.successCompanies ? <Text>Loading...</Text> : (
            <FlatList
              data={data.companies}
              renderItem={CompanyCard}
              keyExtractor={(item) => item.id}
              style={{ flex: 1 }}
            />)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  heading: {
    fontSize: 24,
  }
});

const mapStateToProps = state => {
  return {
    title: state.title,
  }
};

const reduxConnectedApp = connect(mapStateToProps, null)(App);
const graphQLConnectedApp = graphql(gql`
query {
  companies {
    id
    name
    employees {
      name
    }
  },
  successCompanies {
    name
    employees {
      name
    }
  }
}
`)(reduxConnectedApp);

export default graphQLConnectedApp;