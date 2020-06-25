import { getDecks } from '../utils/api';

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const CREATE_DECK = 'CREATE_DECK'
export const CREATE_CARD = 'CREATE_CARD'

export function getAllDecks(decks) {
    return {
        type: GET_ALL_DECKS,
        decks
    }
}

export function addCard(deck, cardInfo) {
    return {
        type: CREATE_CARD,
        deck,
        cardInfo
    }
}

export function addDeck(deckTitle) {
    return {
        type: CREATE_DECK,
        title: deckTitle
    }
}
