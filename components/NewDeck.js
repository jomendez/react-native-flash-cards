import Constants from 'expo-constants'
import React, { Component } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../store/actions'
import { saveDeckTitle } from '../utils/api'
import { dark, secondaryLight, light } from '../utils/colors'
import Toast from './Toast'


export class NewDeck extends Component {
    static navigationOptions = {
        title: 'New Deck'
    }

    state = {
        deckName: '',
        showNotification: false
    }

    onInput = (text) => {
        this.setState({
            deckName: text
        })
    }

    onAddName = () => {
        const { deckName } = this.state
        this.setState({ showNotification: false })
        if (!deckName) {
            this.setState({ showNotification: true })
            return
        }

        this.props.createNewDeck(deckName)
        saveDeckTitle(deckName)
        this.setState({
            deckName: ''
        })

       this.props.navigation.navigate('DetailDeck', { deck: deckName })
    }

    render() {
        return (
            <View style={{display: 'flex', flex: 1}}>
                <KeyboardAvoidingView behavior='padding' style={styles.mainContent}>
                    <Text style={styles.headerText}>Create new deck</Text>
                    <TextInput
                        onChangeText={this.onInput}
                        placeholder={'Enter Deck Title'}
                        style={styles.input}>
                    </TextInput>
                    <TouchableOpacity style={styles.submitButton} onPress={this.onAddName}>
                        <Text style={styles.submitButtonText}>Create Deck</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                {this.state.showNotification && (
                    <Toast text={"The deck title can not be empty"} onHideToastNotification={() => { this.setState({ showNotification: false }) }} />
                )}
            </View>
        )
    }
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    mainContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: light,
        paddingBottom: 20,
        paddingRight: 10,
        paddingTop: Constants.statusBarHeight,
        paddingLeft: 10,
    },
    headerText: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: dark,
        padding: 25,
        borderRadius: 8,
        width: width - 50,
        marginBottom: 15,
        marginTop: 12,
    },
    input: {
        padding: 25,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 18,
        borderWidth: 2,
        borderColor: secondaryLight,
        borderRadius: 8,
        width: width - 50,
        textAlign: 'center'
    },
    submitButtonText: {
        color: light,
        textAlign: 'center',
        fontSize: 22
    }
})

const mapDispatchToProps = dispatch => ({
    createNewDeck: (title) =>
        dispatch(addDeck(title))
})
export default connect(null, mapDispatchToProps)(NewDeck)