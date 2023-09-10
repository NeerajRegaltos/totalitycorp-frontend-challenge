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
        <div className="p-5">
            <h3>Order has been placed successfully.</h3>

            <br />
            <h4>Expected delivery Date : <span style={{fontWeight:"bold"}}>{deliveryDate}</span></h4><br />
            <h4>Delivery Address: <span style={{fontWeight:"bold"}}>{address.house} {address.locality} {address.pincode} {address.state} </span></h4>
            <br />
            <Link to={"/"}>Shop Here</Link>
        </div>
    </>
}

export default Delivery;