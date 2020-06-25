import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { dark, secondaryLight, light } from '../utils/colors'

export class DeckBox extends Component {
    render() {
        const { deck, onNavigateDetailDeck } = this.props
        if (!deck) {
            return null
        }
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => onNavigateDetailDeck(deck.title)}>
                    <View style={styles.card}>
                        <Text style={{ fontSize: 35, marginTop: 11, marginBottom: 10 }}>{deck.title}</Text>
                        <Text style={{ color: secondaryLight, fontSize: 20 }}>{deck.questions.length} cards</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    card: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        margin: 15,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: light,
        backgroundColor: light,
        shadowColor: dark,
        shadowOpacity: 0.20,
        shadowRadius: 3,
        elevation: 9,
        shadowOffset: {
            width: 0,
            height: 2
        }
    }
})

function mapStateToProps(state, deck) {
    const deckState = state[deck.title]
    return {
        deck: deckState
    }
}
export default connect(mapStateToProps)(DeckBox)