import * as Styled from './RemoveItemSheet.styles'

import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useContext } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { deleteCartProduct } from 'src/api/cart'
import { productWithQuantityType } from 'src/types/product'
import { theme } from 'src/styles/theme'

interface Props {
  sheetRef: React.Ref<BottomSheetModalMethods>
  handleProductDelete: (product: productWithQuantityType) => void
  closeRemoveItemSheet: () => void
  selectedProduct?: productWithQuantityType
  refreshProducts: () => void
}

export const RemoveItemSheet = ({
  sheetRef,
  closeRemoveItemSheet,
  handleProductDelete,
  selectedProduct,
  refreshProducts,
}: Props) => {
  const { setModalErrorText } = useContext(AppContext)
  const handleProductRemoval = async () => {
    const { data, error } = await deleteCartProduct({ id: selectedProduct.id })
    refreshProducts()
    if (error && error.code) {
      if (error || !data?.quantity) {
        setModalErrorText(
          `There was an error when trying to update the quantity. error code: ${error?.code}`
        )
        return
      }
    }
  }

  return (
    <BottomSheetModal
      enablePanDownToClose
      ref={sheetRef}
      index={0}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{
        backgroundColor: theme.darkColors.dark2,
        borderRadius: 40,
      }}
      snapPoints={[428]}
    >
      <Styled.Container>
        <Styled.Title>Remove From Cart?</Styled.Title>
        <Styled.StyledMiniProduct
          disableDelete
          disableChangeQuantity
          handleDelete={handleProductDelete}
          productInfo={selectedProduct}
          initialQuantity={selectedProduct?.quantity}
        />
        <Styled.Actions>
          <Styled.CancelButton onPress={() => closeRemoveItemSheet()}>
            Cancel
          </Styled.CancelButton>
          <Styled.AcceptButton onPress={() => handleProductRemoval()}>
            Yes, Remove
          </Styled.AcceptButton>
        </Styled.Actions>
      </Styled.Container>
    </BottomSheetModal>
  )
}
