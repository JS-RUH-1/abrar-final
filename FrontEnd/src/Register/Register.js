import Button from 'react-bootstrap/Button'
import React from 'react'
 import '../Register/Register.css'
import Form  from 'react-bootstrap/Form';
import Row  from 'react-bootstrap/Row';
import Col  from 'react-bootstrap/Col';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwt from "jwt-decode";


const Register = () => {
  
    const getLocalStorage = localStorage.getItem("token")
    const [Email, setEmail] = useState()
    const [Password, setPassword] = useState()
    const [UserType , setUserType]=useState()
    const navigate=useNavigate();

      const register= (e) => {

          e.preventDefault()
          axios
          .post('http://localhost:5000/singup',{
              email:Email,
              password:Password,
              UserType:UserType
      })
          .then((res) => {
              console.log(res)
                   if (res.data.errors) {
            }
            if (res.data.user) {
              console.log(res.data)
              const token = res.data.user;
              console.log(token)
              const user = jwt(token); 
              console.log(user)
             localStorage.setItem("token", token);
             navigate(-1)

            }

            }
            )
           
         }

    return (
        <div className="Container">
        <div className="Wrapper">
        <h1>SIGN UP</h1>

        <div className="Form"> 
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control  onChange={(e)=> {setEmail(e.target.value)}} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control  onChange={(e)=> {setPassword(e.target.value)}} type="password" placeholder="Password" />
  </Form.Group>
</Form>
        
    <fieldset>

    <Form.Group as={Row} className="mb-3">
      <Form.Label as="legend" column sm={2}>
        
      </Form.Label>
      <Col sm={1}>
        <Form.Check
          type="radio"
          label="USER"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          onChange={(e)=>{setUserType("user")}}
        />
        <Form.Check
          type="radio"
          label="ADMIN"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          onChange={(e)=>{setUserType("admin")}}
        />
        </Col>
        </Form.Group>

        
    </fieldset>

    <div className="bu">
    
        <Button variant="outline-info" onClick = {(e)=>{register(e)}}>CREATE</Button>
        {/* Already have an account? */}
        </div>
        
        </div>
        </div>
        </div>
    
    )
}
       
export default Register
