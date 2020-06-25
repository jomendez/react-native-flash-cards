import { AsyncStorage } from 'react-native'
import { decks } from './INITIAL_DATA'

export const STORAGE_KEY = 'MobileFlashCards:decks';

export function getDeck(title) {
    return getDecks()
        .then((decks) => decks[title]);
}

export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then(result => {
            if (result !== null) {
                return JSON.parse(result)
            } else {
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks))
                return decks;
            }
        })
}

export function addCardToDeck(deck, card) {
    return getDecks()
        .then((decks) => {
            decks[deck.title].questions.push(card)
            AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
        })
}

export function saveDeckTitle(title) {
    const deck = { title, questions: []}
    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: deck
    }))
}
