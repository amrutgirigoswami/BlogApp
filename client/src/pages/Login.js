import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from "../redux/store"
import toast from "react-hot-toast"
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Local State
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    // Handle Inputs Change
    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //Form handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/user/login', {
                email: inputs.email,
                password: inputs.password
            })
            if (data.success) {
                localStorage.setItem("userId", data?.user._id)
                dispatch(authActions.login())
                toast.success("User Login Successfully");
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={450}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    margin={"auto"}
                    marginTop={6}
                    boxShadow={"10px 10px 20px #ccc"}
                    padding={3}
                    borderRadius={5}
                >
                    <Typography variant='h5' padding={3} textAlign={"center"}>
                        Login
                    </Typography>
                    <TextField value={inputs.email} onChange={handleChange} placeholder='Email' type={'email'} name='email' margin="normal" required />
                    <TextField value={inputs.password} onChange={handleChange} placeholder='Password' type={'password'} name='password' margin="normal" required />

                    <Button type='submit' sx={{ borderRadius: 2, marginTop: 3, alignItems: 'center' }} variant="contained" color="primary">Login</Button>
                    <Button onClick={() => navigate('/register')} sx={{ borderRadius: 2, marginTop: 3, alignItems: 'center' }} color="primary">If you new user ? Please Register</Button>
                </Box >
            </form>
        </>
    )
}

export default Login