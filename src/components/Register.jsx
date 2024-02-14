import React, { useState } from 'react'
import axios from "axios"
import "./Register.css"
import { useNavigate } from "react-router-dom"
const Register = () => {
    const [userData, setUserData] = useState({ name: "", email: "", password: "" });
    const redirect = useNavigate()
    const handleChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.name && userData.email && userData.password) {
            try {
                const response = await axios.post("http://localhost:4000/register", { userData })
                if (response?.data?.success) {
                    alert(response.data.message)
                    setUserData({ name: "", email: "", password: "" })
                    redirect('/')
                } 
            } catch (error) {
                alert(error.response.data.message)
            }
        } else {
            alert("all field are required")
        }

    }

    return (
        <div id='reg-screen'>
            <div id='reg-div'>
                <h1 id='reg-headline'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <label className='reg-label'>Name:</label><br />
                    <input className="reg-input" type='text' name='name' onChange={handleChange} value={userData.name} /><br />
                    <label className='reg-label' >Email:</label><br />
                    <input className="reg-input" type='email' name='email' onChange={handleChange} value={userData.email} /><br />
                    <label className='reg-label' >Password:</label><br />
                    <input className="reg-input" type='password' name='password' onChange={handleChange} value={userData.password} /><br />
                    <input id="reg-submit-btn" type='submit' value="Register" />
                </form>
                <p id='reg-last'>If already an user <b onClick={() => redirect('/login')}>Login</b></p>
            </div>
        </div>
    )

}
export default Register
