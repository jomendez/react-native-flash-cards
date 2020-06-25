import { CREATE_CARD, CREATE_DECK, GET_ALL_DECKS } from './actions'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case GET_ALL_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case CREATE_CARD:
            const { deck, cardInfo } = action
            const deckTitle = deck.title
            return {
                ...state,
                [deckTitle]: {
                    ...state[deckTitle],
                    questions: [...state[deckTitle].questions].concat(cardInfo)
                }
            }

        case CREATE_DECK:
            const title = action.title
            return {
                ...state,
                [title]: {
                    title,
                    questions: []
                }
            }
    }
}