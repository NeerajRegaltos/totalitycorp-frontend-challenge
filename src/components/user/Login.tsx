import React, { useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogin, setUserData } from "../../redux/reducer/userReducer";


const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const allUsers = useSelector((state: any) => state.user.allUsers);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e: any) => {
        try {
            const val = e.target.value;
            const keyy = e.target.name;

            setData({ ...data, [keyy]: val });

        } catch (err) {
            console.log(err)
        }
    }

    const loginUser = (e: any) => {
        try {
            e.preventDefault();

            for (let k in data) {
                if (data[k].trim().length <= 0) {
                    alert("Please fill all the fileds");
                    return;
                }
            }
            if (allUsers.length > 0) {
                for (let user of allUsers) {
                    if (user.email === data.email) {
                        if (user.password == data.password) {
                            dispatch(setUserData(user));
                            dispatch(setIsLogin(true));
                            navigate("/");
                        } else {
                            alert("Password is wrong");
                            return;
                        }
                    } else {
                        alert("Please register yourself.");
                        return;
                    }
                }
            } else {
                alert("Please register yourself.");
                return;
            }


        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <Header />
        <div className="row">
            <div className="col d-flex justify-content-center mt-5">
                <form style={{ width: "20rem" }}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handleChange} aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" onClick={loginUser}>Login</button>
                    <p><Link to={"/register"}>Don't have account? register here</Link></p>

                </form>
            </div>
        </div>

    </>
}

export default Login;