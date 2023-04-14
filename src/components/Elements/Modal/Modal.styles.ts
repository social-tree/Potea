import styled from 'styled-components/native'

export const BackShadowDrop = styled.View`
  flex: 1;
  position: absolute;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 0.4;
`

export const ModalContainer = styled.View`
  background-color: ${({ theme }) => theme.darkColors.dark2};
  opacity: 1;
  border-radius: 44px;
  z-index: 3;
  max-width: 100%;
`

export const Container = styled.View<{ open: boolean }>`
  flex: 1;
  position: absolute;
  display: ${({ open }) => (open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 100%;
  height: 100%;
`
