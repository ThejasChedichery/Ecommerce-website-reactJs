
import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAllProduct } from "../../Utilities/AllProductSlice"
import { saveCardData, showCardData } from "../../Utilities/CardDataSlice"
import { addCartData } from "../../Utilities/CartSlice"
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from 'react-toastify';
import "./Card.css"


const Card = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

        axios.get('https://dummyjson.com/products?limit=0')
            .then(res => {

                dispatch(saveAllProduct(res.data.products))
                dispatch(saveCardData(res.data.products))
                dispatch(showCardData(res.data.products))
            })

    }, [])

    const CardShow = useSelector(select => select.cardData.CardShow)
    const Cartdata = useSelector(select => select.Cart.cartItems)

    const addToCart = (e) => {
        const selectCartItem = CardShow.filter(item => item.id == e.target.name)
        const addQntyItem = selectCartItem.map(item => ({ ...item, quantity: 1}))

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

    return (

        <>
            <Container className="mt-4">
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
                <Row xs={1} md={3} lg={4} xl={5} >
                    {CardShow.length == 0 ? <p>wait</p> : CardShow?.map((items, index) => (
                        <Col key={index} className="cardDiv">
                            <div>
                                <div style={{ position: "relative" }}>
                                    {items.stock < 6 ? <span>Sold Out</span> : ""}
                                    <Link style={{ textDecoration: "none" }} to={`productdetails/:value=${items.id}`}><div className="d-flex justify-content-center"><img src={items.thumbnail} /></div>
                                        <h5 className="mt-3">{items.title}</h5></Link>
                                    <p><span>⭐{items.rating}</span>{items.stock * items.minimumOrderQuantity} reviews</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 style={{ fontWeight: "600", fontSize: "18px", margin: "0" }}>$ {items.price}</h5>
                                    {items.stock < 6 ? <button style={{
                                        border: "1px solid green",
                                        backgroundColor: "transparent",
                                        color: "green",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        width: "110px",
                                        padding: "5px 1px",
                                        borderRadius: "9px"
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
                                    })}>Notify</button> :( Cartdata?.some(cart => cart.id === items.id))? <button style={{
                                        border: "1px solid green",
                                        backgroundColor: "transparent",
                                        color: "green",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        width: "110px",
                                        padding: "5px 1px",
                                        borderRadius: "9px"
                                    }}onClick={()=>navigate('/Cart')} >Go to cart</button> :<button style={{
                                        border: "1px solid green",
                                        backgroundColor: "green",
                                        color: "white",
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        width: "110px",
                                        padding: "5px 1px",
                                        borderRadius: "9px"
                                    }} name={items.id} onClick={addToCart}>Add to Cart</button>
                                    }
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )

}

export default Card;


