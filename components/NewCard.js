import Constants from 'expo-constants'
import React, { Component } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { addCard } from '../store/actions'
import { addCardToDeck } from '../utils/api'
import { dark, secondaryLight, light } from '../utils/colors'
import Toast from './Toast'

export class NewCard extends Component {
    static navigationOptions = {
        title: 'New Card'
    }

    state = {
        question: '',
        answer: '',
        showNotification: false
    }

    onAddQuestion = (textValue) => {
        this.setState({
            question: textValue
        })
    }

    onAddAnswer = (textValue) => {
        this.setState({
            answer: textValue
        })
    }

    onHideToastNotification() {
        this.setState({ showNotification: false })
    }

    onSubmitQuestion() {
        const { question, answer } = this.state

        if ((!question || !answer) && question === answer) {
            this.setState({ showNotification: true })
            return
        }

        const deck = this.props.navigation.state.params.deck
        this.props.createNewCard(deck, { question, answer })
        addCardToDeck(deck, { question, answer }).then(_ => {
            this.setState({
                question: '',
                answer: ''
            })

            this.props.navigation.navigate('DetailDeck', deck)
        })
    }

    render() {
        const deck = this.props.navigation.state.params.deck
        return (
            <View style={{ display: 'flex', flex: 1 }}>
                <View style={styles.mainContent}>
                    <Text style={styles.heading}>Add a new card to "{deck.title}" deck!</Text>
                    <KeyboardAvoidingView behavior='padding' >
                        <TextInput
                            onChangeText={this.onAddQuestion}
                            placeholder={'Enter the question'}
                            style={styles.input}>
                        </TextInput>
                        <Text style={styles.subtitle}>Enter the answer:</Text>
                        <TextInput
                            onChangeText={this.onAddAnswer}
                            placeholder={'e.g true or false'}
                            style={styles.input}>
                        </TextInput>
                        <TouchableOpacity style={styles.submitButton} onPress={() => { this.onSubmitQuestion() }}>
                            <Text style={styles.submitText}>Create Card</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </View>
                {this.state.showNotification && (
                    <Toast text={"Invalid Entry"} onHideToastNotification={() => { this.onHideToastNotification() }} />
                )}
            </View>
        )
    }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 10,
        backgroundColor: light
    },
    heading: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10,
        marginTop: 20
    },
    submitButton: {
        backgroundColor: dark,
        padding: 25,
        borderRadius: 8,
        width: width - 50,
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    submitText: {
        textAlign: 'center',
        fontSize: 21,
        color: light,
    },
    secondaryText: {
        color: dark,
        textAlign: 'center',
        fontSize: 21
    },
    input: {
        padding: 25,
        marginTop: 10,
        marginBottom: 25,
        fontSize: 18,
        borderWidth: 2,
        borderColor: secondaryLight,
        borderRadius: 8,
        width: width - 50,
        textAlign: 'center'
    }
})

const mapDispatchToProps = dispatch => ({
    createNewCard: (deck, question, answer) =>
        dispatch(addCard(deck, question, answer))
})

export default connect(null, mapDispatchToProps)(NewCard)