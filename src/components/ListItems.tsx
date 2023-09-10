import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCartList, setCartItemCount } from "../redux/reducer/cartReducer";
import { useNavigate } from "react-router-dom";


const ListItems: React.FC = () => {
    const navigate = useNavigate();

    let productData = useSelector((state: any) => state.products.productData)
    let filterData = useSelector((state: any) => state.products.filteredData)
    let isFilter = useSelector((state: any) => state.products.isFilter)
    let cartList = useSelector((state: any) => state.cart.cartList);
    let cartItemCount = useSelector((state: any) => state.cart.cartItemCount);

    const [data, setData] = useState([]);

    const dispatch = useDispatch();

    const handleClick = (i: number) => {
        try {
            dispatch(addIntoCartList({ ...data[i], count: 1 }));
            dispatch(setCartItemCount(cartItemCount + 1));
        } catch (error) {
            console.log(error)
        }

    }

    function renderStars(stars: number) {
        let star = "";
        for (let i = 0; i < stars; i++) {
            star += "⭐";
        }

        return star;
    }

    useEffect(() => {
        if (isFilter) {
            setData(filterData)
        } else {
            setData(productData);
        }
    })

    return <>
        <div className="container-fluid" style={{marginLeft: "10px"}}>

            <div className="row">

                {
                    data.length > 0 ?
                        data.map((product: any, index: number) => {
                            return <div className="col-auto mt-1 mb-3" key={product.id}>
                                <div className="card custom-card">
                                    <img src={product.thumbnail} className="card-img-top" alt={product.brand} />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.title.slice(0, 20)}</h5>
                                        <p className="card-text">{(product.description).slice(0, 50)}{product.description.length > 50 ? "..." : ""}</p>
                                        <p className="card-text">₹{product.price} {renderStars(Math.floor(product.rating))}</p>
                                        {cartList.length > 0 && cartList.filter((item: any) => item.id === product.id).length > 0 ? <button className="btn btn-primary" onClick={() => navigate("/cart")}>Go to cart</button> : <button className="btn btn-primary" onClick={() => handleClick(index)}>Add to cart</button>}
                                    </div>
                                </div>
                            </div>
                        })
                        : 
                        <h3>Not Available, Please choose different filter.</h3>
                }

            </div>

        </div>


    </>
}

export default ListItems;