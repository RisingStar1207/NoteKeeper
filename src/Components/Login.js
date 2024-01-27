import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
    const host=`http://localhost:${process.env.REACT_APP_PORT}`;
    const [credentials, setCredentials] = useState({ userName: "", emailAddress: "", password: "", cpassword: "" });
    const navigate = useNavigate();
    const Submit = async (e) => {
        if(credentials.password===credentials.cpassword){
            e.preventDefault();
            const response = await fetch(`${host}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name:credentials.userName,email:credentials.emailAddress,password:credentials.password})
            });
            const json = await response.json();
            localStorage.setItem("Token",json.authToken);
            console.log(localStorage.getItem("Token"));
            navigate("/");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <div className="mb-3">
                <label for="userName" className="form-label">UserName</label>
                <input type="text" className="form-control" id="userName" name="userName" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="emailAddress" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailAddress" name="emailAddress" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="cpassword" className="form-label">Confirm Password</label>
                <input type="password" id="cpassword" className="form-control" aria-describedby="passwordHelpBlock" name="cpassword" onChange={onChange} />
            </div>
            <button className="btn btn-primary" type="submit" onClick={Submit}>Login</button>
        </div>
    )
}

export default Login
