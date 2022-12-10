import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { StoreItemType } from "../context/StoreContext"
import { formatCurrency } from "../util/formatCurrency"

export function StoreItem({
  _id,
  name,
  price,
  imgUrl,
  description,
}: StoreItemType) {
  const { getItemQuantity, addToCart, removeFromCart } = useShoppingCart()
  const quantity = getItemQuantity(_id)

  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='200px'
        style={{ objectFit: "cover" }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <span className='fs-2'>{name}</span>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button className='w-100' onClick={() => addToCart(_id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: ".5rem" }}>
              <Button
                onClick={() => removeFromCart(_id)}
                variant='danger'
                size='sm'>
                Remove from cart
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}
