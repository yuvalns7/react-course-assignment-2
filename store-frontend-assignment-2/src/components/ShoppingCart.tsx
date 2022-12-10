import { useState } from "react"
import { Button, Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useStore } from "../context/StoreContext"
import { formatCurrency } from "../util/formatCurrency"
import { CartItem } from "./CartItem"
import { SubmitOrderModal } from "./SubmitOrderModal"

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems, cartQuantity } = useShoppingCart()
  const { storeItems } = useStore()
  const [showSubmitOrder, setShowSubmitOrder] = useState(false)

  const handleClose = () => setShowSubmitOrder(false)
  const handleShow = () => setShowSubmitOrder(true)

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item._id} {...item} enableDelete={true} />
          ))}
          <div className='ms-auto fw-bold fs-5'>
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i._id === cartItem._id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
          {cartQuantity > 0 && (
            <div className='mx-auto fw-bold fs-5'>
              <Button onClick={handleShow}> place order</Button>
            </div>
          )}

          <SubmitOrderModal
            show={showSubmitOrder}
            handleClose={handleClose}></SubmitOrderModal>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
