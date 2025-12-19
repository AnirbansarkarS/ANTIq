import { useState, useEffect } from 'react'
import {
    subscribeToItem,
    subscribeToItemBids,
    subscribeToNotifications,
    subscribeToMessages
} from '../lib/database'

/**
 * Hook to subscribe to real-time item updates
 */
export const useRealtimeItem = (itemId) => {
    const [item, setItem] = useState(null)

    useEffect(() => {
        if (!itemId) return

        const channel = subscribeToItem(itemId, (payload) => {
            setItem(payload.new)
        })

        return () => {
            channel.unsubscribe()
        }
    }, [itemId])

    return item
}

/**
 * Hook to subscribe to real-time bids on an item
 */
export const useRealtimeBids = (itemId) => {
    const [bids, setBids] = useState([])

    useEffect(() => {
        if (!itemId) return

        const channel = subscribeToItemBids(itemId, (payload) => {
            setBids(prev => [payload.new, ...prev])
        })

        return () => {
            channel.unsubscribe()
        }
    }, [itemId])

    return bids
}

/**
 * Hook to subscribe to real-time notifications
 */
export const useRealtimeNotifications = (userId) => {
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        if (!userId) return

        const channel = subscribeToNotifications(userId, (payload) => {
            setNotifications(prev => [payload.new, ...prev])

            // Optional: Show browser notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification(payload.new.title, {
                    body: payload.new.message,
                    icon: '/logo.png'
                })
            }
        })

        return () => {
            channel.unsubscribe()
        }
    }, [userId])

    return notifications
}

/**
 * Hook to subscribe to real-time messages
 */
export const useRealtimeMessages = (userId) => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (!userId) return

        const channel = subscribeToMessages(userId, (payload) => {
            setMessages(prev => [payload.new, ...prev])
        })

        return () => {
            channel.unsubscribe()
        }
    }, [userId])

    return messages
}

/**
 * Hook to request notification permission
 */
export const useNotificationPermission = () => {
    const [permission, setPermission] = useState(
        'Notification' in window ? Notification.permission : 'denied'
    )

    const requestPermission = async () => {
        if ('Notification' in window) {
            const result = await Notification.requestPermission()
            setPermission(result)
            return result
        }
        return 'denied'
    }

    return { permission, requestPermission }
}
