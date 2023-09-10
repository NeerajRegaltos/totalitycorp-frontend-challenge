import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUserData } from "../../redux/reducer/userReducer";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";


const Register = () => {

    const allUsers = useSelector((state: any) => state.user.allUsers);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        img: ""
    })

    const handleChange = (e: any) => {
        try {
            const val = e.target.value;
            const keyy = e.target.name;

            setData({ ...data, [keyy]: val });

        } catch (err) {
            console.log(err);
        }
    }



    const registerUser = (e: any) => {
        try {
            e.preventDefault();
            for (let k in data) {
                if (data[k].trim().length <= 0) {
                    alert("Please fill all the fileds");
                    return;
                }
            }

            for (let user of allUsers) {
                if (user.email === data.email) {
                    alert("User is already registered");
                    return;
                }
            }
            dispatch(setUserData(data));
            dispatch(setIsLogin(true));
            navigate("/");

        } catch (error) {
            console.log(error)
        }
    }

    return <>
        <Header />
        <div className="container">
            <div className="row">
                <div className="col d-flex justify-content-center mt-5">
                    <form style={{ width: "20rem" }} className="text-center">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="name" onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Image Url</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" name="img" onChange={handleChange} />
                        </div>


                        <button type="submit" className="btn btn-primary" onClick={registerUser}>Register</button>
                        <p><Link to={"/login"}>Have account? login here</Link></p>
                    </form>
                </div>
            </div>
        </div>

    </>
}

export default Register;