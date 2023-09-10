import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";


const Delivery = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { address } = location && location?.state;
    const date = new Date();

    date.setDate(date.getDate() + 2);
    const deliveryDate = String(date).slice(0, 15);

    useEffect(() => {
        if (!location) {
            navigate("/");
        }
    }, []);

    return <>
        <Header />
        <div className="">
            <h3>Order has been placed successfully.</h3>

            <br />
            <h4>Expected delivery Date : {deliveryDate}</h4><br />
            <h4>Delivery Address: <h3>{address.house} {address.locality} {address.pincode} {address.state} </h3></h4>
            <br />
            <Link to={"/"}>Shop Here</Link>
        </div>
    </>
}

export default Delivery;