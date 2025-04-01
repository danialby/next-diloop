import { useState } from 'react'

interface SortConfig<T> {
  key: keyof T | null
  direction: 'asc' | 'desc' | null
}

function useSort<T>(defaultConfig: SortConfig<T> = { key: null, direction: null }) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(defaultConfig)

  const requestSort = (key: keyof T) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  const sortItems = (items: T[], key: keyof T | null, direction: 'asc' | 'desc' | null): T[] => {
    if (!key || !direction)
      return items

    return [...items].sort((a, b) => {
      const aValue = key === 'created_at' ? new Date(a[key] as string) : a[key]
      const bValue = key === 'created_at' ? new Date(b[key] as string) : b[key]

      if (aValue === null || aValue === undefined)
        return 1
      if (bValue === null || bValue === undefined)
        return -1

      if (direction === 'asc') {
        return String(aValue).localeCompare(String(bValue))
      }
      return String(bValue).localeCompare(String(aValue))
    })
  }

  return { sortConfig, requestSort, sortItems }
}

export default useSort
