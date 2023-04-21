import { Loading } from 'src/assets/animations/Loading'
import { ParagraphM } from 'src/styles/utils/typography'
import { HeadingSix } from 'src/styles/utils/typography'
import styled from 'styled-components/native'

export const StyledLoading = styled(Loading)`
  width: 200px;
  height: 200px;
`

export const LoadingContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const NotificationIcon = styled.View`
  width: 68px;
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary[500]};
  border-radius: 100px;
`

export const NotificationDesc = styled.Text`
  ${ParagraphM}
  color: ${({ theme }) => theme.other.white};
`

export const NotificationTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white};
`

export const NotificationDetails = styled.View`
  display: flex;
  gap: 8px;
`

export const Notification = styled.View`
  padding: 16px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`

export const DateTitle = styled.Text`
  ${HeadingSix}
  color: ${({ theme }) => theme.other.white};
`

export const Container = styled.View`
  padding: 20px;
  display: flex;
  gap: 24px;
  height: 100%;
`
