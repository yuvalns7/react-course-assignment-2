import axios from "axios"
import { useState } from "react"
import { Alert, Col, Container, Row } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useStore } from "../context/StoreContext"
import { formatCurrency } from "../util/formatCurrency"
import { CartItem } from "./CartItem"

type SubmitOrderProps = {
  show: boolean
  handleClose: () => void
}

export function SubmitOrderModal({ show, handleClose }: SubmitOrderProps) {
  const { cartItems } = useShoppingCart()
  const { storeItems } = useStore()
  const [validated, setValidated] = useState(false)
  const { removeAllFromCart } = useShoppingCart()
  const [formValue, setFormValue] = useState({ firstName: "", lastName: "" })

  const handleSubmit = (event: any) => {
    const form = event.currentTarget

    if (form.checkValidity() === true) {
      axios
        .post(`http://localhost:3000/orders`, {
          firstName: formValue.firstName,
          lastName: formValue.lastName,
          totalAmount: getTotalAmount(),
          productList: cartItems,
        })
        .then((response) => {
          removeAllFromCart()
          handleClose()
        })
        .catch((error) => {
          console.error(error)
        })
    }

    event.stopPropagation()
    event.preventDefault()

    setValidated(true)
  }

  const handleChange = (event: any) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value })
  }

  const getTotalAmount = () => {
    return cartItems.reduce((total, cartItem) => {
      const item = storeItems.find((i) => i._id === cartItem._id)
      return total + (item?.price || 0) * cartItem.quantity
    }, 0)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Place Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name='firstName'
                  required
                  size='sm'
                  type='text'
                  placeholder='please enter your first name'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlInput1'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name='lastName'
                  required
                  size='sm'
                  type='text'
                  placeholder='please enter your last name'
                  onChange={handleChange}
                />
              </Form.Group>

              {cartItems.map((item) => (
                <CartItem key={item._id} {...item} enableDelete={false} />
              ))}

              <Row className='justify-content-md-center'>
                <Col xs={6} md={4}>
                  <div className='ms-auto fw-bold fs-5'>
                    Total {formatCurrency(getTotalAmount())}
                  </div>{" "}
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' type='submit'>
              Submit Order
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}
