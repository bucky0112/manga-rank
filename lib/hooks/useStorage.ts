import { useState } from 'react'

const useStorage = (key: string, initialValue: any) => {
  const isBrowser = typeof window !== 'undefined'
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (isBrowser) {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      console.error(error)
    }
    return initialValue
  })

  const setValue = (value: any) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (isBrowser) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const clearStorage = () => {
    try {
      if (isBrowser) {
        window.localStorage.removeItem(key)
      }
      setStoredValue(initialValue)
    } catch (error) {
      console.error(error)
    }
  }

  return { storedValue, setValue, clearStorage }
}

export { useStorage }
