import { FontAwesome } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import Constants from 'expo-constants'
import React, { Component } from 'react'
import { Dimensions, FlatList, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks } from '../store/actions'
import { getDecks } from '../utils/api'
import { dark, light } from '../utils/colors'
import DeckBox from './DeckBox'

export class Home extends Component {

  _isMounted = false;

  static navigationOptions = {
    title: 'FlashCard'
  }

  state = {
    loading: true
  }


  componentDidMount() {
    this._isMounted = true;
    const { dispatch } = this.props
    getDecks()
      .then(decks => dispatch(getAllDecks(decks)))
      .then(() => {
        if (this._isMounted) {
          this.setState({ loading: false })
        }
      })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  _keyExtractor = (_, index) => `item-${index}`;

  onCreateDeck() {
    this.props.navigation.navigate('NewDeck')
  }

  onNavigateToDetails = (deck) => {
    this.props.navigation.navigate('DetailDeck', { deck })
  }

  render() {
    const { decks } = this.props
    if (this.state.loading) {
      return <AppLoading />
    }
    return (
      <SafeAreaView style={styles.container}>
        {/* <Text>{JSON.stringify(Object.values(decks))}</Text> */}
        <FlatList
          data={Object.values(decks)}
          renderItem={
            ({ item }) => {
              return <DeckBox style={styles.deck} deck={item} title={item.title} onNavigateDetailDeck={this.onNavigateToDetails} />
            }
          }
          keyExtractor={this._keyExtractor}
        />
        <TouchableOpacity style={styles.fabButton} onPress={() => { this.onCreateDeck() }}>
          <FontAwesome name="plus" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>

      </SafeAreaView>
    )
  }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: light
  },
  icon:{
    alignSelf: 'center',
    justifyContent: 'center',
    color: light
  },
  fabButton: {
    display: 'flex',
    justifyContent: "center",
    backgroundColor: dark,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: dark,
    position: 'absolute',
    bottom: 15,
    right: 15,
    shadowColor: dark,
    shadowOpacity: 0.20,
    shadowRadius: 3,
    elevation: 9,
    shadowOffset: {
        width: 0,
        height: 2
    }
  }
});

function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(mapStateToProps)(Home)