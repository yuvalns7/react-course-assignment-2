import { Col, Row } from "react-bootstrap"
import { useState, useEffect } from "react"
import { StoreItem } from "../components/StoreItem"
import { useStore } from "../context/StoreContext"

export function Store() {
  const { storeItems } = useStore()

  return (
    <Row md={2} xs={1} lg={3} className='g-3'>
      {storeItems.map((product: any) => (
        <Col key={product._id}>
          <StoreItem {...product} />
        </Col>
      ))}
    </Row>
  )
}
