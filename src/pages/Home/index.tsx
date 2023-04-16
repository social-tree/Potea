import { TouchableOpacity } from 'react-native'
import { supabase } from 'src/utils/supabase'
import styled from 'styled-components/native'

export const Home = ({ navigation }) => {
  return (
    <TouchableOpacity onPress={() => supabase.auth.signOut()}>
      <StyledText>log out</StyledText>
    </TouchableOpacity>
  )
}

const StyledText = styled.Text``
