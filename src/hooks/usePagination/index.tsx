import { useContext, useEffect, useState } from 'react'

import { AppContext } from 'src/contexts/AppContext'

export const usePagination = (callback, amountPerPage = 10) => {
  const [offset, setOffset] = useState(0)
  const [data, setData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const { setLoading, loading } = useContext(AppContext)

  const fetchData = async (extraParams?: any) => {
    offset === 0 && setLoading(true)
    const { data, countData } = await callback({
      offset: offset,
      amountPerPage,
      ...extraParams,
    })
    setData((prev) => (offset === 0 ? data : [...prev, ...data]))
    console.log(countData?.count, offset + 1)
    setHasMore(countData?.count > offset + 1)
    offset === 0 && setLoading(false)
  }
  const nextPage = () => {
    console.log(data.length, hasMore, 'next')
    data.length > 0 && hasMore && setOffset((prev) => prev + 10)
  }

  const onPageRefresh = () => {
    setOffset(0)
  }

  return {
    hasMore,
    data,
    offset,
    fetchData,
    nextPage,
    onPageRefresh,
    loading,
  }
}
