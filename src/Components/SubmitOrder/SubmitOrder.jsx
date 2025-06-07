
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import "./SubmitOrder.css"

const SubmitOrder = () => {

library.add(faCheck)
    return (
        <>
            <Container className="submitDiv p-4 d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h1><FontAwesomeIcon icon="fa-solid fa-check" /></h1>
                    <h4>Order placed successfully</h4>
                    <p>Thank you for shopping with us. You will receive a confirmation email with details of your order shortly</p>
                    <Link to="/"><button>Check out our new arrivals</button></Link>
                </div>
            </Container>
        </>
    )

}

export default SubmitOrder