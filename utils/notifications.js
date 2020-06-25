import { AsyncStorage } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

const KEY = 'FlashCards:notifications'

export function clearLocalNotifications() {
    return AsyncStorage.removeItem(KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
    return {
        title: 'Remainder',
        body: `👋 Don't forget to study today!`,
        ios: {
            sound: true
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        }
    }
}

export function setLocalNotification() {
    AsyncStorage.getItem(KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let nextDay = new Date()
                            nextDay.setDate(nextDay.getDate() + 1)
                            nextDay.setHours(20)
                            nextDay.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: nextDay,
                                    repeat: 'day'
                                })

                            AsyncStorage.setItem(KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}