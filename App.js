import Constants from 'expo-constants'
import React, { Component, useEffect } from 'react'
import { StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import MainNavigation from './components/Navigation'
import reducer from './store/reducers'
import { light } from './utils/colors'
import { setLocalNotification } from './utils/notifications'

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default function App() {

  useEffect(() => {
    setLocalNotification()
  }, [])

  return (
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
      <View style={{ flex: 1 }} >
        {/* <MyStatusBar backgroundColor={light}/> */}
        <MainNavigation />
      </View>
    </Provider>
  )

}
