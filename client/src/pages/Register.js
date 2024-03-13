import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, Button } from '@mui/material'
import axios from 'axios';
import toast from "react-hot-toast"
const Register = () => {
    const navigate = useNavigate();

    // Local State
    const [inputs, setInputs] = useState({
        name: '',
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
            const { data } = await axios.post('/api/v1/user/register', {
                username: inputs.name,
                email: inputs.email,
                password: inputs.password
            })
            if (data.success) {
                toast.success("User Register Successfully");
                navigate('/login')
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
                        Register
                    </Typography>
                    <TextField value={inputs.name} onChange={handleChange} placeholder='Name' type={'text'} name='name' margin="normal" required />
                    <TextField value={inputs.email} onChange={handleChange} placeholder='Email' type={'email'} name='email' margin="normal" required />
                    <TextField value={inputs.password} onChange={handleChange} placeholder='Password' type={'password'} name='password' margin="normal" required />

                    <Button type='submit' sx={{ borderRadius: 2, marginTop: 3, alignItems: 'center' }} variant="contained" color="primary">Register</Button>
                    <Button onClick={() => navigate('/login')} sx={{ borderRadius: 2, marginTop: 3, alignItems: 'center' }} color="primary">Already Register ? Please Login</Button>
                </Box >
            </form>
        </>
    )
}

export default Register