import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useStore } from "../context/StoreContext"
// import storeItems from "../data/items.json"
import { formatCurrency } from "../util/formatCurrency"

type CartItemProps = {
  _id: number
  quantity: number
  enableDelete: boolean
}

export function CartItem({ _id, quantity, enableDelete }: CartItemProps) {
  const { removeFromCart } = useShoppingCart()
  const { storeItems } = useStore()

  const item = storeItems.find((i) => i._id === _id)
  if (item == null) return null

  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className='me-auto'>
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className='text-muted' style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className='text-muted' style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      {enableDelete && (
        <Button
          variant='outline-danger'
          size='sm'
          onClick={() => removeFromCart(item._id)}>
          &times;
        </Button>
      )}
    </Stack>
  )
}
