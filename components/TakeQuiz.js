import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants'
import React, { Component } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { dark, secondaryLight, success, light, warning } from '../utils/colors'

export class TakeQuiz extends Component {

    static navigationOptions = {
        title: 'Take Quiz'
    }

    state = {
        current: 0,
        corrects: 0,
        wrong: 0,
        total: 0,
        showQuestion: true,
    }

    onReset() {
        this.setState({
            current: 0,
            corrects: 0,
            wrong: 0,
            showQuestion: true,
            total: 0
        });
    }

    onAnswer = (question, userSelectedAnswer) => {
        const { answer } = question
        if (userSelectedAnswer) {
            this.setState((prevState, props) => ({
                corrects: prevState.corrects + 1,
            }))

        } else {
            this.setState((prevState, props) => ({
                wrong: prevState.wrong + 1
            })
            )
        }

        this.setState((prevState, props) => ({
            total: prevState.total + 1
        }))

        this.setState({
            showQuestion: true,
            current: this.state.current + 1,
        })
    }

    render() {
        const { deck } = this.props
        const questions = deck.questions;
        const question = questions[this.state.current]
        if (questions.length === 0) {
            return (
                <View style={styles.mainContent}>
                    <View style={styles.viewBase}>
                        <Text style={styles.headerText}>Couldn't find any cards for this Deck</Text>
                        <TouchableOpacity style={[styles.buttonBase, styles.addCardButton]} onPress={() => this.props.navigation.navigate('NewCard', { deck })}>
                            <Text style={[styles.buttonTextBase, { color: dark }]}>Add first card to deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        if (this.state.total === questions.length) {
            const { wrong, corrects } = this.state
            return (
                <View style={styles.mainContent}>
                    <Text style={styles.headerText}>Results</Text>
                    <View style={[styles.viewBase, { marginBottom: 20 }]}>
                        <Text style={[styles.subtitleText, { color: success }]}>Total correct questions: {corrects}</Text>
                        <Text style={[styles.subtitleText, { color: warning }]}>Total wrong questions: {wrong}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.buttonBase, styles.buttonPrimary]} onPress={() => this.onReset()}>
                            <Text style={[styles.buttonTextBase, { color: light }]}>Re-take Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonBase, styles.buttonSecondary]} onPress={() => this.props.navigation.goBack()}>
                            <Text style={[styles.buttonTextBase, { color: dark }]}>Go to deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.mainContent}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.headerText}>{deck.title}</Text>
                    <View>
                        <Text style={styles.subtitleText}>Card {this.state.current + 1} of {questions.length}</Text>
                    </View>
                </View>
                <View style={styles.card}>
                    {
                        !this.state.showQuestion ?
                            <View style={styles.viewBase}>
                                <Text style={styles.cardSubtitle}>Answer:</Text>
                                <Text style={styles.cardText}>{question.answer}</Text>
                            </View>
                            :
                            <View style={styles.viewBase}>
                                <Text style={styles.cardSubtitle}>Question:</Text>
                                <Text style={styles.cardText}>{question.question}</Text>
                            </View>
                    }
                </View>
                <View style={[styles.viewBase, { marginTop: 15, marginBottom: 20 }]}>
                    <TouchableWithoutFeedback onPress={() => this.setState({ showQuestion: !this.state.showQuestion })}>
                        <Text style={{ fontSize: 20 }}>{!!this.state.showQuestion ? 'Show answer' : 'Show question'}</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.actionButtonsContainer}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: success }]} onPress={() => this.onAnswer(question, true)}>
                        <FontAwesome name="check" style={styles.buttonIcons}></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: warning }]} onPress={() => this.onAnswer(question, false)}>
                        <FontAwesome name="remove" style={styles.buttonIcons}></FontAwesome>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
 
    headerText: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 10,
    },
    buttonIcons: {
        alignSelf: 'center',
        fontSize: 70,
        color: light
    },
    actionButton: {
        flexBasis: '40%',
        padding: 20,
        borderRadius: 8,
    },
    actionButtonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: width,
        margin: 10
    },
    cardText: {
        fontSize: 32
    },
    cardSubtitle: {
        fontSize: 18,
        color: secondaryLight,
        marginBottom: 20
    },
    card: {
        display: 'flex',
        flex: 1,
        width: width - 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        margin: 5,
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
    },
    subtitleText: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 25
    },
    mainContent: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingRight: 10,
        paddingLeft: 10,
        paddingBottom: 20,
        backgroundColor: light
    },
    viewBase: {
        textAlign: 'center',
        padding: 20
    },
    headerText: {
        textAlign: 'center',
        fontSize: 38,
        marginBottom: 20,
    },
    addCardButton: {
        backgroundColor: light,
        borderColor: dark,
        borderWidth: 3,
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
        width: width - 50,
        marginTop: 10,
        marginBottom: 10
    },
})

function mapStateToProps(_ , myProps) {
    return { deck: myProps.navigation.state.params.deck };
}

export default connect(mapStateToProps)(TakeQuiz)