import styled from 'styled-components/native'

export const ShippingTypeContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 24px;
  padding: 20px;
  align-items: center;
`
