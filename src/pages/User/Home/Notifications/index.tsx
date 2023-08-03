import * as Styled from './Notifications.styles'

import { Dimensions, FlatList } from 'react-native'
import { useContext, useEffect } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { getUserNotifications } from 'src/api/notifications'
import { notificationType } from 'src/types/notification'
import { useHeaderHeight } from '@react-navigation/elements'
import { usePagination } from 'src/hooks/usePagination'

const screenHeight = Dimensions.get('screen')?.height

export const Notifications = () => {
  const headerHeight = useHeaderHeight()
  const { data, fetchData, onPageRefresh, loading } =
    usePagination(getUserNotifications)
  const { user } = useContext(AppContext)

  useEffect(() => {
    fetchData({
      userCreationDate: user.created_at,
    })
  }, [])

  return (
    <FlatList
      data={data}
      onRefresh={() => onPageRefresh()}
      refreshing={loading}
      contentContainerStyle={{
        minHeight: screenHeight - headerHeight - 70,
        padding: 20,
        gap: 24,
      }}
      renderItem={({ item }) => (
        <Styled.Container>
          <Styled.DateTitle>{item.date}</Styled.DateTitle>
          <Styled.Notifications>
            {item.notifications?.map((notification: notificationType) => {
              return (
                <Styled.Notification>
                  <Styled.NotificationIcon>
                    <MaterialCommunityIcons
                      name={notification?.notification_types?.icon_name as any}
                      size={30}
                      color="white"
                    />
                  </Styled.NotificationIcon>

                  <Styled.NotificationDetails>
                    <Styled.NotificationTitle>
                      {notification.notification_types?.title}
                    </Styled.NotificationTitle>
                    <Styled.NotificationDesc>
                      {notification.notification_types?.desc}
                    </Styled.NotificationDesc>
                  </Styled.NotificationDetails>
                </Styled.Notification>
              )
            })}
          </Styled.Notifications>
        </Styled.Container>
      )}
    />
  )
}
