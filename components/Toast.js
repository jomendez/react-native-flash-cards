import React from 'react'
import { View } from 'react-native'
import ToastNotification from 'react-native-toast-notification'

export default function Toast({ text }, { onHideToastNotification }) {
    return (
        <View>
            <ToastNotification
                textStyle={{ color: 'white' }}
                style={{ backgroundColor: 'black' }}
                text={text}
                duration={2000}
                onHide={onHideToastNotification}
            />
        </View>
    )
}
