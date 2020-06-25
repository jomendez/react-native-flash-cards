import Constants from 'expo-constants'
import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { dark, light } from '../utils/colors'
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications'

export class DetailDeck extends Component {

    static navigationOptions = {
        title: 'Deck Details'
    }

    onTakeQuiz() {
        const deck = this.props.deck

        clearLocalNotifications()
            .then(setLocalNotification)
            .then(this.props.navigation.navigate('TakeQuiz', { deck }))
    }

    render() {
        const { deck } = this.props
        return (
            <View style={styles.main}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{deck.title}</Text>
                    <Text style={styles.subTitle}>{deck.questions.length} total cards</Text>
                </View>
                <View>
                    <TouchableOpacity style={[styles.buttonBase, styles.buttonPrimary]} onPress={() => { this.onTakeQuiz() }}>
                        <Text style={[styles.buttonTextBase, {color: light}]}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={[styles.buttonBase, styles.buttonSecondary]} onPress={() => this.props.navigation.navigate('NewCard', { deck })}>
                        <Text style={[styles.buttonTextBase, {color: dark}]}>Add new card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({

    header: {
        marginBottom: 40
    },
    headerText: {
        fontSize: 40,
        marginTop: 10,
        marginBottom: 5,
        textAlign: 'center'
    },
    subTitle: {
        color: dark,
        fontSize: 22,
        textAlign: 'center'
    },

    buttonPrimary: {
        backgroundColor: dark,
    },
    buttonSecondary: {
        backgroundColor: light,
        borderWidth: 2,
        borderColor: dark,
    },
    buttonTextBase: {
        textAlign: 'center',
        fontSize: 21
    },
    buttonBase: {
        padding: 20,
        borderRadius: 8,
        width: width - 40,
        marginTop: 10,
        marginBottom: 10
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: light,
        paddingBottom: 20,
        paddingTop: Constants.statusBarHeight,
        paddingRight: 10,
        paddingLeft: 10
    }
})

function mapStateToProps(state, myProps) {
    return { deck: state[myProps.navigation.state.params.deck] };
}

export default connect(mapStateToProps)(DetailDeck)