
import { useRef } from 'react'
import './App.css'
import Card from './Components/Cards/Cards'
import Category from './Components/Category/Category'
import Home from './Components/Home./Home'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddToCart from './Components/AddToCart/AddToCart'
import SubmitOrder from './Components/SubmitOrder/SubmitOrder'
import DetailProduct from './Components/DetailProduct/DetailProduct'
import { useDispatch, useSelector } from "react-redux";

function App() {

  const scrollPageSearch = useRef()
  const dispatch = useDispatch()
  const Cartdata = useSelector(select=>select.Cart.cartItems)

  return (
    <>
      <Navbar forwardedRef={scrollPageSearch} />
      <Routes>
        <Route path='/' element={<><Home forwardedRef={scrollPageSearch} />
          <Category />
          <Card /> </>} />
          <Route path='Cart' element={<AddToCart/>}/>
          <Route path='/thank-you' element={<SubmitOrder/>}/>
          <Route path='productdetails/:id' element={<DetailProduct reduxProps={{dispatch,Cartdata}}/>}/>
      </Routes>
    </>
  )
}

export default App
