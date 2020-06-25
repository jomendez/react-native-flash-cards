import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { dark, light } from '../utils/colors'
import Deck from './DeckBox'
import DetailDeck from './DetailDeck'
import Home from './Home'
import NewCard from './NewCard'
import NewDeck from './NewDeck'
import TakeQuiz from './TakeQuiz'

const Navigation = createStackNavigator({
    Home: {
        screen: Home
    },
    DetailDeck: {
        screen: DetailDeck
    },
    NewCard: {
        screen: NewCard
    },
    Deck: {
        screen: Deck
    },
    NewDeck: {
        screen: NewDeck
    },
    TakeQuiz: {
        screen: TakeQuiz
    }
},{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerStyle: {
            height: 90,
            backgroundColor: dark,
        },
        headerTitleStyle: 'bold',
        headerTintColor: light,
        headerBackTitle: 'back'
    }
})


export default createAppContainer(Navigation)