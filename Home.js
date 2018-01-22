import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text, TextInput, Button, AsyncStorage } from 'react-native';
import CoinCard from './CoinCard';

const API_URL = 'https://api.coinmarketcap.com/v1/ticker/';

export default class Home extends Component {
  state = {
    coinsData: [],
    baseCurrency: 'USD',
    searchField: '',
    isFetching: false
  };

  componentWillMount() {
    this.fetchCoinsData();
  }

  static navigationOptions = ({navigation}) => ({
    title: 'CoinWatch',
    headerStyle: { paddingRight: 10 },
    headerRight: (
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} color="black" />
    )
  });

  _onRefresh() {
    this.fetchCoinsData();
  }

  fetchCoinsData() {
    this.setState({
      isFetching: true
    });

    AsyncStorage.getItem('@coinWatch.baseCurrency').then(value => {
      this.setState({
        baseCurrency: value || 'USD'
      });
      fetch(API_URL)
        .then(response => response.json())
        .then(coinsData => {
          this.setState({
            coinsData,
            isFetching: false
          });
        });
    });
  }

  filterCoinsData() {
    const { searchField, coinsData } = this.state;
    return (searchField === '')
      ? coinsData
      : coinsData.filter(({ name }) => new RegExp(searchField, 'i').test(name));
  }

  render() {
    const coinsData = this.filterCoinsData();
    const { baseCurrency } = this.state;

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.searchTextField}
          placeholder="Search"
          value={this.state.searchField}
          onChangeText={searchField => this.setState({ searchField })}
          autoCorrect={false}
          underlineColorAndroid="rgba(0,0,0,0)"
        />

        <ScrollView
          style={styles.content}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isFetching}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          {
            coinsData.map(item => {
              return (
                <CoinCard
                  key={item.id}
                  name={item.name}
                  symbol={item.symbol}
                  priceCurrency={baseCurrency === 'USD' ? '$' : 'Ƀ'}
                  priceAmount={baseCurrency === 'USD' ? item.price_usd : item.price_btc}
                  percentChange1h={item.percent_change_1h}
                  percentChange24h={item.percent_change_24h}
                  percentChange7d={item.percent_change_7d}
                />
              );
            })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dddddd',
  },
  header: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  searchTextField: {
    height: 40,
    marginTop: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});
