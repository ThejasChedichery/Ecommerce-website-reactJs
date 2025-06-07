
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {addCartData} from "../../Utilities/CartSlice"
import { Slide, ToastContainer, toast } from 'react-toastify';
import "./AddToCart.css"


const AddToCart = () => {

    const cartData = useSelector(select => select.Cart.cartItems)
    const subTotal = useSelector(select=>select.Cart.Subtotal)
    const cartNoS = useSelector(select=>select.Cart.cartNoS)
    const dispatch = useDispatch()

const incCountFun =(e)=>{

    const addedCount = cartData.map(item=>{

        if(item.id == e.target.name){

            let changeItem = {...item}
            changeItem.quantity += 1;
            return changeItem
        }

        else return item;
    })

    dispatch(addCartData(addedCount))

}

const decCountFun =(e)=>{

    const addedCount = cartData.map(item=>{

        if(item.id == e.target.name && item.quantity>1){

            let changeItem = {...item}
            changeItem.quantity -= 1;

            return changeItem
        }
        
        else return item;
    })

    dispatch(addCartData(addedCount))

}

const removeCart =(e)=>{

    const removeList = cartData.filter(item=>{
        item.id!=e.target.name})
    dispatch(addCartData(removeList))

    toast.success('Product removed from cart', {
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
                <h4 style={{
                    fontSize: "21px",
                    fontWeight: "564",
                    margin: "22px 0"
                }}>Products in Cart</h4>
                <Row md={2}>
                    <Col md={8}>
                        {cartData.length<1?<h6 style={{textAlign:"center", margin:"10px 0"}}>No items in Cart</h6>:
                        <table style={{ width: "100%" }}>
                            <thead>
                                <tr className="cartHead">
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th style={{textAlign:"center"}}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData?.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: "1px solid #00000012" }}>
                                        <td className="pt-3 pb-3">
                                            <Row md={2} xs={1}>
                                                <Col md={4} lg={3} xl={2}>
                                                    <img src={item.thumbnail} style={{ width: "72px", height: "72px",}} /></Col>
                                                <Col md={8} lg={9} xl={10}>
                                                    <div>
                                                        <h6 className="m-0">{item.title}</h6>
                                                        <p style={{ fontSize: "13px", color: "#8f8989", margin: "7px 0" }}><span style={{
                                                            backgroundColor: "#00000012",
                                                            padding: "3px 5px",
                                                            borderRadius: "8px",
                                                            marginRight: "6px",
                                                            color: "black"
                                                        }}>⭐{item.rating}</span>{item.stock * item.minimumOrderQuantity} reviews</p>
                                                        <h5 style={{ fontSize: "18px", margin: "0" }}>$ {item.price}</h5>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </td>
                                        <td>
                                            <div className="qntyIncDiv">
                                                <button name={item.id} onClick={decCountFun}>-</button>
                                                <span>{item.quantity}</span>
                                                <button name={item.id} onClick={incCountFun}>+</button>
                                            </div>
                                        </td>
                                        <td><div>
                                            <h4 style={{margin:"0",fontSize:"18px",textAlign:"center"}}>${(item.price * item.quantity).toFixed(2)}</h4>
                                            </div>
                                        </td>
                                        <td style={{textAlign:"center"}}>
                                            <button name={item.id} onClick={removeCart} style={{
                                                 cursor: "pointer",
                                                 border: "none",
                                                 backgroundColor: "transparent",
                                                 fontSize:"18px",
                                                 color:"#0000007f"
                                            }}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </Col>
                    <Col md={4}>
                        <div className="cartTotal">
                            <h5>Cart Total</h5>
                            <div className="d-flex justify-content-between border-bottom">
                                <p style={{fontSize:"13px",color:"#b1b1b1"}}>Subtotal</p>
                                <p>$ {subTotal.toFixed(2)}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center pt-4 pb-4">
                                <h6 className="m-0">Total Payable</h6>
                                <h5 className="m-0">$ {subTotal.toFixed(2)}</h5>
                            </div>
                            <Link to={cartNoS==0?"":'/thank-you'}><button onClick={()=>dispatch(addCartData([]))} style={{backgroundColor:cartNoS==0?"#00000059":"green",cursor:cartNoS==0?"unset":"pointer"}}>Proceed to checkout</button></Link>
                            <Link to="/"><p className="mt-2 mb-0">Back to Shopping</p></Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddToCart;