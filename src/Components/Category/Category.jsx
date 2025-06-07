
import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { saveCardData, showCardData } from "../../Utilities/CardDataSlice";
import "./Category.css"



const Category = () => {

    const [itemCategory, setItemCategory] = useState([])

    const dispatch = useDispatch()
    const allProducts = useSelector(select => select.allProducts.allItem)

    const imageArray = ["https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/motorcycle/Generic%20Motorcycle/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/skin-care/Attitude%20Super%20Leaves%20Hand%20Soap/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/smartphones/iPhone%20X/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/tablets/iPad%20Mini%202021%20Starlight/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/tops/Blue%20Frock/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/vehicle/Charger%20SXT%20RWD/4.png",
        "https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/womens-dresses/Black%20Women's%20Gown/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Crystal%20Earring/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/thumbnail.png",
        "https://cdn.dummyjson.com/products/images/womens-watches/Rolex%20Datejust%20Women/thumbnail.png"
    ]

    useEffect(() => {

        axios.get('https://dummyjson.com/products/categories')
            .then(res => {

                const addArray = res.data.map((item, index) => ({ ...item, catimage: imageArray[index] }))

                setItemCategory(addArray);

            })

    }, [])

    const selectCategory = (e) => {

        axios.get(`https://dummyjson.com/products/category/${e.target.getAttribute('name')}`)
            .then(res => {

                console.log(res.data.products);

                if (e.target.getAttribute('name') == "allProduct") {

                    dispatch(saveCardData(allProducts))
                    dispatch(showCardData(allProducts))

                } else {

                    dispatch(saveCardData(res.data.products))
                    dispatch(showCardData(res.data.products))
                }

            })
    }



    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 10,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1445,
                settings: {
                    slidesToShow: 9,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1027,
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            }
        ]

    }
    return (

        <>
            <Container className="mt-5">
                <h4>Categories</h4>
                <div className="slider-container">
                    <Slider {...settings}>
                        <div className="catDiv" name="allProduct" onClick={selectCategory}>
                            <img name="allProduct" src="https://s3-us-west-2.amazonaws.com/imgds360live/storefront/3545396/1586365076.png" />
                            <h5 name="allProduct" >All Products</h5>
                        </div>
                        {itemCategory?.map((item, index) => (
                            <div className="catDiv" key={index} name={item.slug} onClick={selectCategory}>
                                <img name={item.slug} src={item.catimage} />
                                <h5 name={item.slug}>{item.name}</h5>
                            </div>
                        ))}
                    </Slider>
                </div>
            </Container>
        </>
    )

}


export default Category;