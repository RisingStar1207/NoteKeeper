import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
    const host=`http://localhost:${process.env.REACT_APP_PORT}`;
    const [credentials, setCredentials] = useState({ emailAddress: "", password: ""});
    const navigate = useNavigate();
    const Submit = async (e) => {
            e.preventDefault();
            const response = await fetch(`${host}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email:credentials.emailAddress,password:credentials.password})
            });
            const json = await response.json();
            localStorage.setItem("Token",json.authToken);
            navigate("/");
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
  return (
    <div>
              <div className="container my-3">
            <div className="mb-3">
                <label for="emailAddress" className="form-label">Email address</label>
                <input type="email" className="form-control" id="emailAddress" name="emailAddress" onChange={onChange} />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={onChange} />
            </div>
            <button className="btn btn-primary" type="submit" onClick={Submit}>Signup</button>
        </div>
    </div>
  )
}

export default Signup
