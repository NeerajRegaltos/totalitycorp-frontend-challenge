import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



const ProceedToPayment = () => {

    const navigate = useNavigate();

    type addressType = {
        house: string;
        locality: string;
        pincode: string;
        state: string;
        mobile: string;
    }
    type cardType = {
        cardNumber: string,
        startDate: string,
        expiryDate: string,
        code: string,
    }

    const [address, setAddress] = useState<addressType>({
        house: "",
        locality: "",
        pincode: "",
        state: "",
        mobile: ""
    });

    const [card, setCard] = useState<cardType>({
        cardNumber: "",
        startDate: "",
        expiryDate: "",
        code: "",
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

    const cardDetail = (e: any) => {
        const name = e.target.name;
        const val = e.target.value;

        setCard({
            ...card,
            [name]: val
        })
    }

    const ProceedToPay = (e: any) => {
        try {
            e.preventDefault();
            for (let k in card) {
                const val = card[k]?.trim();
                if (val.length <= 0) {
                    alert("Please fill all the fields");
                    return;
                }
            }
            alert("Payment has been made successfully");

            navigate("/delivery", {
                state: {
                    address
                }
            });

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
                <input type="number" placeholder="Card Number" name="cardNumber" className="shippingAddress" style={{ width: "415px" }} disabled={disable} onChange={cardDetail} />
                <br />
                <input type="number" placeholder="Start Date" name="startDate" className="shippingAddress" disabled={disable} onChange={cardDetail} />

                <input type="number" placeholder="Expiry Date" name="expiryDate" className="shippingAddress" disabled={disable} onChange={cardDetail} />
                <br />
                <input type="number" placeholder="4 digits Code" name="code" className="shippingAddress" disabled={disable} onChange={cardDetail} />

                <br />
                <button className="btn btn-primary" disabled={disable} onClick={ProceedToPay}>Proceed to pay</button>
            </form>

        </div>
    </>
}

export default ProceedToPayment;