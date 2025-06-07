

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import "./Navbar.css"
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showCardData } from "../../Utilities/CardDataSlice";
import { Link } from 'react-router-dom';

const Navbar = (props) => {

    const scrollPageSearch = props.forwardedRef;
    const [visibility, setVisibility] = useState(true)
    const cardData = useSelector(select => select.cardData.CardItem)
    const cartNoS = useSelector(select=>select.Cart.cartNoS)
    const dispatch = useDispatch()

    library.add(faCartShopping)
    library.add(faBarsStaggered)
    library.add(faXmark)
    library.add(faMagnifyingGlass)
    library.add(faRightToBracket)

    const clickNav = () => {

        visibility ? setVisibility(false) : setVisibility(true)

    }

    const searchFunction = (e) => {

        console.log(e.target.value);
        let searchValue = e.target.value.toLowerCase();

        const searchData = cardData.filter(items => {

            let itemName = items.title?.toLowerCase()
            let itemCategory = items.category?.toLowerCase()
            let itemBrand = items.brand?.toLowerCase()

            return itemName?.includes(searchValue) || itemCategory?.includes(searchValue) || itemBrand?.includes(searchValue);
        })

        dispatch(showCardData(searchData))

    }
    

    return (
        <>
            <div className="navMain">
                <div className='navLogo'>
                    <FontAwesomeIcon icon={visibility ? "fa-solid fa-bars-staggered" : "fa-solid fa-xmark"} onClick={clickNav} />
                    <img src="https://e-comm-five-nu.vercel.app/assets/logo-Cw6-4FdH.svg" />
                </div>
                <div className='navContent' style={{ display: visibility ? "none" : "block" }}>
                    <h2>Home</h2>
                    <h2>Products</h2>
                    <h2>About</h2>
                    <h2>Contact</h2>
                </div>
            
                <div className='serchInp'>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                    <input type="text" placeholder='Search For product' onInput={searchFunction}
                        onClick={() => window.scrollTo(0, scrollPageSearch.current.offsetHeight)} />
                </div>

                <div className='logCart'>
                    <button><FontAwesomeIcon icon="fa-solid fa-right-to-bracket" /></button>
                    <Link to="Cart">
                        <div style={{ position: "relative" }}>
                            <FontAwesomeIcon style={{ color: 'black', fontSize: "23px" }} icon="fa-solid fa-cart-shopping" />
                            {cartNoS >= 1 ? <span style={{
                                position: "absolute",
                                bottom: "18px",
                                left: "19px",
                                backgroundColor: "green",
                                borderRadius: "50%",
                                padding: "0px 5px",
                                color: "white",
                                fontSize: "11px"
                            }}>{cartNoS}</span> : ""}
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar;