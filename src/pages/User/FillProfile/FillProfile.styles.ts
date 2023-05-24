import { EditPen } from 'src/assets/svg/EditPen'
import { EmptyProfile } from 'src/assets/svg/EmptyProfile'
import styled from 'styled-components/native'

export const StyledEditPen = styled(EditPen)`
  position: absolute;
  bottom: 0px;
  right: 0px;
`

export const StyledEmptyProfile = styled(EmptyProfile)``

export const ProfilePictureContainer = styled.View`
  position: relative;
`

export const Container = styled.ScrollView`
  padding: 24px;
  display: flex;
`
