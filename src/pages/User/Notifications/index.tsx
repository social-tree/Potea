import {
  Container,
  DateTitle,
  LoadingContainer,
  Notification,
  NotificationDesc,
  NotificationDetails,
  NotificationIcon,
  NotificationTitle,
  StyledLoading,
} from './Notifications.styles'
import { Dimensions, ScrollView } from 'react-native'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { CreditCard } from 'src/assets/svg/CreditCard'
import { LocationPin } from 'src/assets/svg/LocationPin'
import React from 'react'
import { Sale } from 'src/assets/svg/Sale'
import { User } from 'src/assets/svg/User'
import { Wallet } from 'src/assets/svg/Wallet'
import { useHeaderHeight } from '@react-navigation/elements'

const screenHeight = Dimensions.get('screen')?.height

export const Notifications = () => {
  const [sortedNotifications, setSortedNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const headerHeight = useHeaderHeight()
  const notifications = useContext(AppContext).notifications

  useEffect(() => {
    const sortNotifications = () => {
      setLoading(true)
      // split so we can takout the date without the timestamp (hours/minutes)
      const todayDateISO = new Date().toISOString().split('T')[0]
      const yesterdayDateISO = new Date(
        new Date().setDate(new Date().getDate() - 1)
      )
        .toISOString()
        .split('T')[0]

      const NotificationGroups = {}

      notifications.forEach((notification) => {
        const date = notification.date.split('T')[0]
        const determinedDate =
          date === todayDateISO
            ? 'Today'
            : yesterdayDateISO === date
            ? 'Yesterday'
            : new Date(date).toDateString()
        if (!NotificationGroups[determinedDate]) {
          NotificationGroups[determinedDate] = []
        }
        NotificationGroups[determinedDate].push(notification)
      })

      // Sort groups by date
      const sortedGroups = Object.entries(NotificationGroups)
        .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
        ?.map(([date, notifications]) => ({ date, notifications }))
      setSortedNotifications(sortedGroups)
      setLoading(false)
    }
    sortNotifications()
  }, [notifications])

  return (
    <ScrollView
      contentContainerStyle={{ minHeight: screenHeight - headerHeight - 70 }}
    >
      <Container>
        {loading ? (
          <LoadingContainer>
            <StyledLoading />
          </LoadingContainer>
        ) : (
          sortedNotifications?.map((notificationGroup) => (
            <>
              <DateTitle>{notificationGroup.date}</DateTitle>
              {notificationGroup.notifications?.map((notification) => {
                const type = notification.type
                return (
                  <Notification>
                    <NotificationIcon>
                      {type === 'sale' ? (
                        <Sale />
                      ) : type === 'wallet' ? (
                        <Wallet />
                      ) : type === 'location' ? (
                        <LocationPin />
                      ) : type === 'payment' ? (
                        <CreditCard />
                      ) : type === 'user' ? (
                        <User />
                      ) : (
                        <></>
                      )}
                    </NotificationIcon>

                    <NotificationDetails>
                      <NotificationTitle>
                        {notification.title}
                      </NotificationTitle>
                      <NotificationDesc>{notification.desc}</NotificationDesc>
                    </NotificationDetails>
                  </Notification>
                )
              })}
            </>
          ))
        )}
      </Container>
    </ScrollView>
  )
}
