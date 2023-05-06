import { Container, Products } from './Wishlist.styles'
import { FlatList, ScrollView } from 'react-native'
import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'
import { Chip } from 'src/components/Form/Elements/Chip'
import { Product } from 'src/components/Elements/Product'
import { Search } from 'src/assets/svg/Search'
import { SearchInput } from 'src/components/Form/Elements/Inputs'
import { filters } from 'src/constants/filters'
import { theme } from 'src/styles/theme'
import { useForm } from 'react-hook-form'

export const Wishlist = () => {
  const { control } = useForm()
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [wishlistProducts, setWishlistProducts] = useState([])
  const { favoriteProducts, addProductToFavorites } = useContext(AppContext)

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter)
  }

  useEffect(() => {
    let products = []
    for (const [key, value] of favoriteProducts) {
      products = [...products, value]
    }
    setWishlistProducts(products)
  }, [favoriteProducts])

  return (
    <ScrollView>
      <Container>
        <SearchInput
          leftIcon={<Search />}
          name="search"
          placeholder="Search"
          inputProps={{
            placeholderTextColor: theme.greyscale[600],
          }}
          control={control}
        />
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          horizontal
        >
          {filters.map((filter) => (
            <Chip
              onPress={() => handleFilterChange(filter)}
              selected={selectedFilter === filter}
              text={filter}
            />
          ))}
        </ScrollView>
        <Products>
          <FlatList
            data={wishlistProducts}
            numColumns={2}
            renderItem={({ item, index }) => (
              <Product
                style={{
                  marginRight: index % 2 !== 0 ? 0 : 15,
                }}
                product={item}
                key={item.id}
                liked={!!favoriteProducts.get(item.id)}
                handleAddToFavorites={addProductToFavorites}
              />
            )}
          />
        </Products>
      </Container>
    </ScrollView>
  )
}
