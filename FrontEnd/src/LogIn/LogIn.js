import Button from 'react-bootstrap/Button'
import React from 'react'
import { Link } from 'react-router-dom'
import '../Register/Register.css'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import Form  from 'react-bootstrap/Form';



const LogIn = () =>{

    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/login', {
            email: email,
            password: password
        })
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    const token = res.data.user;
                    console.log(token)
                    const user = jwt(token); 
                    console.log(user)
                    localStorage.setItem("token", token); 
                    navigate(-1)
                }
            })

        }

    return(
        <div className="Container">
        <div className="Wrapper">
        <h1>SIGN IN</h1>

        <div className="Form">
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" />
  </Form.Group>
</Form>

        
        <div className="bu">
        <Button variant="outline-info"  onClick = {(e)=>{login(e)}}>Log In</Button>{' '}
        </div>

        <div className="val">
            <h5>Not a member yet? <Link to="/Register"> Sign Up here </Link> </h5>
        </div>

        
        


        </div>
        </div>
        </div>
    
    )

}
export default LogIn