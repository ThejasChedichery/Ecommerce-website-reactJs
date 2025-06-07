
import axios from 'axios'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { addCartData } from "../../Utilities/CartSlice"
import { Link } from 'react-router-dom';
import "./DetailProduct.css"

class DetailProduct extends React.Component {

  constructor() {

    super(),
      this.state = {
        singleProduct: [],
        count: 0,
        color: ""
      }
  }
  componentDidMount() {

    axios.get(`https://dummyjson.com/products/${window.location.href.split('=')[1]}`)
      .then(res => {

        this.setState({ singleProduct: [{ ...res.data }] })
      })

    library.add(faCartShopping)
  }

  clickImg = (e) => {
    console.log(e);

    this.setState({ count: e.target.name })
  }

  addToCart = () => {

    const { dispatch, Cartdata } = this.props.reduxProps
    const addQntyItem = this.state.singleProduct.map(item => ({ ...item, quantity: 1 }))
    dispatch(addCartData([...Cartdata, ...addQntyItem]))

    toast.success('Product Added to cart', {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "light",
      closeButton: false,
      transition: Slide,
    });
  }
  render() {
    return (
      <>
        <Container>
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            closeButton={false}
            theme="colored"
            transition={Slide}
          />
          <Row md={2}>
            <Col className='detailImg' md={5} >
              <div className='pt-5 ps-2 pe-2'>
                <div className='ps-md-3 pe-md-3'><img src={this.state.singleProduct[0]?.images[this.state?.count]} /></div>
                <div className='d-flex justify-content-center pt-3'>
                  {this.state.singleProduct.map(items => (items.images?.map((item, index) => (
                    <div key={index} style={{ border: (index == this.state.count ? "3px solid green" : "3px solid #00000045") }}><img src={item} style={{ width: "100%" }} name={index} onClick={this.clickImg} /></div>
                  ))))}
                </div>
                <div className='d-flex justify-content-center pt-4'>
                  {this.state.singleProduct[0]?.stock < 6 ? <button style={{
                    border: "3px solid #FF9800",
                    backgroundColor: "transparent",
                    color: "#FF9800",
                    fontSize: "20px",
                    fontWeight: "700",
                    width: "150px",
                    padding: "11px 1px",
                    borderRadius: "9px",
                    margin: "14px"
                  }} onClick={() => toast.success('Product Notifyed', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    closeButton: false,
                    transition: Slide,
                  })}>Notify</button> :
                    <button style={{
                      border: "3px solid #FFC107",
                      backgroundColor: "#FFC107",
                      color: "#000000",
                      fontSize: "18px",
                      fontWeight: 900,
                      width: "150px",
                      padding: "11px 1px",
                      borderRadius: "9px",
                      margin: "14px"
                    }} onClick={this.addToCart}><FontAwesomeIcon
                        icon="fa-solid fa-cart-shopping" /> Add To Cart</button>}
                  {this.state.singleProduct[0]?.stock < 6 ? <button style={{
                    border: "3px solid #FF5722",
                    backgroundColor: "#FF5722",
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "700",
                    width: "150px",
                    padding: "11px 1px",
                    borderRadius: "9px",
                    margin: "14px"
                  }} onClick={() => toast.warning('Product will come soon..', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    closeButton: false,
                    transition: Slide,
                  })}>⚡ Sold out</button> :
                    <Link to="/thank-you">
                      <button style={{
                        border: "3px solid #FF9800",
                        backgroundColor: "#FF9800",
                        color: "white",
                        fontSize: "20px",
                        fontWeight: "700",
                        width: "150px",
                        padding: "11px 1px",
                        borderRadius: "9px",
                        margin: "14px"
                      }}>⚡︎ Buy Now</button></Link>
                  }
                </div>
              </div>
            </Col >
            <Col md={7}>
              {this.state.singleProduct?.map((item, index) => (
                <div key={index} className="detailDeta pt-5 ps-2">
                  <h2>{item.title}</h2>
                  <h3>$ {item.price}</h3>
                  <h6 style={{ color: "green" }}>{item.discountPercentage} % off</h6>
                  <span>⭐ {item.rating}</span>
                  <p><span style={{ color: "black" }}>Description:</span> {item.description}</p>
                  <h5 style={{ fontStyle: "18px" }}>{item.warrantyInformation}</h5>
                  <br /><br />
                  <h4 style={{ fontSize: "19px" }}>Reviews</h4>
                  {item.reviews?.map((item, index) => (
                    <div key={index} style={{ borderTop: "1px solid gray", padding: "10px 0" }}>
                      <h6 style={{ margin: "0", fontWeight: "555" }}>{item.reviewerName}</h6>
                      <span style={{
                        fontSize: "13px",
                        color: "#0000006b"
                      }}>{item.reviewerEmail}</span>
                      <p style={{ marginBottom: "0", marginTop: "10px" }}>"{item.comment}"</p>
                      <p className='mb-1'>{Array.from({ length: item.rating }, (_, index) => <span key={index} style={{ color: "#ffcb00" }}>★</span>)}</p>
                    </div>
                  ))}
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}

export default DetailProduct