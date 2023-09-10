import React, { useEffect, useState } from "react";



const ProceedToPayment = () => {

    type ty = {
        house: string;
        locality: string;
        pincode: string;
        state: string;
        mobile: string;
    }

    const [address, setAddress] = useState<ty>({
        house: "",
        locality: "",
        pincode: "",
        state: "",
        mobile: ""
    });
    const [disable, setDisable] = useState(true);

    const verifyAddress = (e: any) => {
        try {
            e.preventDefault();
            for (let k in address) {
                const val = address[k]?.trim();
                if (val.length <= 0) {
                    setDisable(true);
                    alert("Please fill all the fields");
                    return;
                }
            }
            setDisable(false);
            alert("Sucessfully submitted")
        } catch (error) {
            console.log(error)
        }

    }


    return <>
        <div className="position-relative">


            <form style={{ padding: "10px", border: "0.5px solid black", width: "500px", margin: "10px" }}>
                Shipping Address
                <br />
                <input type="text" placeholder="House Number" className="shippingAddress" style={{ width: "415px" }} onChange={(e) => setAddress({ ...address, house: e.target.value })} />
                <br />
                <input type="text" placeholder="Locality Name" className="shippingAddress" onChange={(e) => setAddress({ ...address, locality: e.target.value })} />

                <input type="number" placeholder="Pincode" className="shippingAddress" onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                <br />
                <input type="text" placeholder="State" className="shippingAddress" onChange={(e) => setAddress({ ...address, state: e.target.value })} />

                <input type="number" placeholder="Mobile Number" className="shippingAddress" onChange={(e) => setAddress({ ...address, mobile: e.target.value })} />

                <br />
                <button className="btn btn-primary" onClick={verifyAddress} id="liveToastBtn">Add Addrress</button>
            </form>


            <form style={{ padding: "10px", border: "0.5px solid black", width: "500px", margin: "10px", backgroundColor: !disable ? "white" : "grey" }} >
                Payment Methods
                <br />
                <input type="number" placeholder="Card Number" className="shippingAddress" style={{ width: "415px" }} disabled={disable} />
                <br />
                <input type="number" placeholder="Start Date" className="shippingAddress" disabled={disable} />

                <input type="number" placeholder="Expiry Date" className="shippingAddress" disabled={disable} />
                <br />
                <input type="number" placeholder="4 digits Code" className="shippingAddress" disabled={disable} />

                <br />
                <button className="btn btn-primary" disabled={disable}>Proceed to pay</button>
            </form>

        </div>
    </>
}

export default ProceedToPayment;