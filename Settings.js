import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, AsyncStorage } from 'react-native';

export default class Settings extends Component {
  state = {
    baseCurrency: 'USD'
  };

  componentWillMount() {
    AsyncStorage.getItem('@coinWatch.baseCurrency').then(value => {
      this.setState({
        baseCurrency: value || 'USD'
      });
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Settings'
  });

  handleBaseCurrencyChange(currency) {
    this.setState({
      baseCurrency: currency
    });
    AsyncStorage.setItem('@coinWatch.baseCurrency', currency);
  }

  render() {
    const { baseCurrency } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.headingText}>
          Currency type
        </Text>
        <Button
          title="USD"
          onPress={() => this.handleBaseCurrencyChange('USD')}
          color={baseCurrency === 'USD' ? 'green' : 'lightgrey'}
        />
        <Button
          title="BTC"
          onPress={() => this.handleBaseCurrencyChange('BTC')}
          color={baseCurrency === 'BTC' ? 'green' : 'lightgrey'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    height: 110,
    justifyContent: 'space-between',
  },
  headingText: {
    fontSize: 18,
  },
});
