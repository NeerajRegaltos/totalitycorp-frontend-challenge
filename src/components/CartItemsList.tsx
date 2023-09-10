import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCartItemCount, setRemoveItem, updateCartList } from "../redux/reducer/cartReducer";
import PaymentButton from "./PaymentButton";



const CartItemsList = () => {
    const dispatch = useDispatch();
    const cartList = useSelector((state: any) => state.cart.cartList);
    const cartItemCount = useSelector((state: any) => state.cart.cartItemCount);
    const isLogin = useSelector((state: any) => state.user.isLogin);


    const incrementItem = (i: number, id: number) => {
        try {
            const cartItem = cartList.filter((cart: any) => cart.id === id);
            dispatch(updateCartList({ id: i, data: { ...cartItem[0], count: cartItem[0].count + 1 } }));
            dispatch(setCartItemCount(cartItemCount + 1));
        } catch (error) {
            console.log(error)
        }

    }

    const decrementItem = (i: number, id: number) => {
        try {
            const cartItem = cartList.filter((cart: any) => cart.id === id);
            if (cartItem[0].count === 1) {
                dispatch(setCartItemCount(cartItemCount - cartItem[0].count));
                dispatch(setRemoveItem(i));
            } else {
                dispatch(updateCartList({ id: i, data: { ...cartItem[0], count: cartItem[0].count - 1 } }));
                dispatch(setCartItemCount(cartItemCount - 1));
            }
        } catch (error) {
            console.log(error)
        }

    }

    const deleteItem = (ind: number) => {
        try {
            dispatch(setCartItemCount(cartItemCount - cartList[ind].count));
            dispatch(setRemoveItem(ind));
        } catch (error) {
            console.log(error)
        }

    }



    const calculateTotal = useCallback(() => {
        const sum = cartList.reduce((acc: number, cart: any) => {
            return acc + (cart.price * cart.count);
        }, 0);

        return sum;
    }, [cartList]);

    function renderStars(stars: number) {
        let star = "";
        for (let i = 0; i < stars; i++) {
            star += "⭐";
        }

        return star;
    }


    return <>

        <div className="card mb-3" style={{width: "50rem"}}>
            {
                cartList && cartList?.length === 0 ?
                    <>
                        {isLogin ? <>
                            <h1>Please Shop some item and come back, we are waiting !!!</h1>
                            <Link to="/" >Shop Here</Link>
                        </> : <Link to="/login" >Login Here</Link>}

                    </>
                    :
                    cartList.map((cart: any, index: number) => {
                        return <>
                            <div className="row g-0" key={cart.id}>
                                <div className="col-md-4">
                                    <img src={cart.thumbnail} style={{ height: "12rem", width: "15rem" }} className="img-fluid rounded-start" alt={cart.brand} />
                                </div>
                                <div className="col-md-8 w-50">
                                    <div className="card-body">
                                        <h5 className="card-title">{cart.title?.slice(0, 20)}</h5>
                                        <p className="card-text">{(cart.description)?.slice(0, 50)}{cart.description?.length > 50 ? "..." : ""}</p>
                                        <p className="card-text">₹{cart.price} {renderStars(Math.floor(cart.rating))}</p>
                                        <p className="card-text"><button className="btn badge bg-success" onClick={() => incrementItem(index, cart.id)}>+</button> <span className="btn badge bg-primary">{cart.count}</span> <button className="btn badge bg-secondary" onClick={() => decrementItem(index, cart.id)}>-</button></p>
                                        <button className="card-text" id="deleteItem" onClick={() => deleteItem(index)}>Delete</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </>
                    })
            }

        </div>
        {
            cartList?.length !== 0 &&
            <div className=" mt-3 ms-3">

                
                    <p>Subtotal ( {cartItemCount} items): ₹{calculateTotal()}</p>
        
            </div>
        }

        <div>
            {cartList?.length !== 0 && <PaymentButton />}
        </div>


    </>
}


export default CartItemsList;