import styled from 'styled-components/native'

export const ShippingTypeContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  gap: 16px;
  background-color: ${({ theme }) => theme.darkColors.dark2};
  border-radius: 24px;
  padding: 20px 18px 20px 26px;
  align-items: center;
`
