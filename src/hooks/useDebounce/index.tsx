import { useEffect, useRef, useState } from 'react'

export function useDebounce(value: string | number, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const firstDebounce = useRef(true)

  useEffect(() => {
    if (value && firstDebounce.current) {
      setDebouncedValue(value)
      firstDebounce.current = false
      return
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return { debouncedValue, firstDebounce }
}
