import styled from 'styled-components/native'

export const ChipText = styled.Text<{ selected?: boolean }>`
  color: ${({ theme, selected }) =>
    selected ? theme.other.white : theme.primary[500]};
`

export const ChipTouchableOpacity = styled.TouchableOpacity<{
  selected?: boolean
}>`
  color: ${({ theme, selected }) =>
    selected ? theme.other.white : theme.primary[500]};
  border: 1px solid ${({ theme }) => theme.primary[500]};
  padding: 4px 20px;
  border-radius: 13px;
  background-color: ${({ theme, selected }) =>
    selected ? theme.primary[500] : 'transparent'};
  overflow: hidden;
`
