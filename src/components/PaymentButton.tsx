import React from "react";
import { useNavigate } from "react-router-dom";


const PaymentButton = () => {
    const navigate = useNavigate();

    return <>
        <div className="row">
            <div className="col-1">

            </div>
            <div className="col">
                <button className="btn bg-warning" onClick={() => navigate("/payment") }>Proceed to Payment</button>
            </div>

        </div>

    </>
}

export default PaymentButton;