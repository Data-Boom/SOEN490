import { useEffect, useState } from "react"

export function useFetch<T>(remoteFetch: () => Promise<T>, initialValue: any = []) {
  const [data, setData] = useState<T>(initialValue)

  useEffect(() => {
    const callRemote = async () => {
      const result = await remoteFetch()
      setData(result)
    }

    callRemote()
  }, [])

  return { data }
}