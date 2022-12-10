import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import axios from "axios"

type StoreProviderProps = {
  children: ReactNode
}

export type StoreItemType = {
  _id: number
  name: string
  price: number
  imgUrl: string
  description: string
}

type StoreContext = {
  storeItems: StoreItemType[]
}

const StoreContext = createContext({} as StoreContext)

export function useStore() {
  return useContext(StoreContext)
}

export function StoreProvider({ children }: StoreProviderProps) {
  const [storeItems, setStoreItems] = useState<StoreItemType[]>([])

  const fetchStoreItems = async () => {
    axios
      .get(`http://localhost:3000/products`)
      .then((response) => {
        setStoreItems(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchStoreItems()
  }, [])

  return (
    <StoreContext.Provider
      value={{
        storeItems,
      }}>
      {children}
    </StoreContext.Provider>
  )
}
