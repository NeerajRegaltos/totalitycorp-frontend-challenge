import React from "react";
import { useNavigate } from "react-router-dom";


const PaymentButton = () => {
    const navigate = useNavigate();

    return <>
        <div className="mb-5 ms-3">
            <button className="btn bg-warning" onClick={() => navigate("/payment")}>Proceed to Payment</button>
        </div>

    </>
}

export default PaymentButton;