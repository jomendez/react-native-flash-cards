import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import MainNavigation from './components/Navigation'
import reducer from './store/reducers'
import { setLocalNotification } from './utils/notifications'


export default function App() {

  useEffect(() => {
    setLocalNotification()
  }, [])

  return (
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
      <View style={{ flex: 1 }} >
        <MainNavigation />
      </View>
    </Provider>
  )

}
