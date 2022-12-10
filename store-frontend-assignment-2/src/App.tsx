import { Routes, Route } from "react-router-dom"
import { Store } from "./pages/Store"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { StoreProvider } from "./context/StoreContext"

function App() {
  return (
    <>
      <StoreProvider>
        <ShoppingCartProvider>
          <Navbar></Navbar>
          <Container className='mb-4'>
            <Routes>
              <Route path='/store' element={<Store />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </StoreProvider>
    </>
  )
}

export default App
