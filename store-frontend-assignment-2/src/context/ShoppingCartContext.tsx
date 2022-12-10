import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useStore } from "./StoreContext"

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  _id: number
  quantity: number
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
  removeAllFromCart: () => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)
  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item._id === id)?.quantity || 0
  }
  const addToCart = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item._id === id) == null) {
        return [...currItems, { _id: id, quantity: 1 }]
      } else {
        return currItems.map((item) => {
          if (item._id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item._id !== id)
    })
  }

  const removeAllFromCart = () => {
    setCartItems([])
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
        removeAllFromCart,
        cartItems,
        cartQuantity,
      }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
}
