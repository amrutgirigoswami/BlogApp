import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import toast from "react-hot-toast"
const BlogDetails = () => {

    const [blog, setBlog] = useState([]);
    const navigate = useNavigate();
    const id = useParams().id
    const [inputs, setInputs] = useState({});
    const getBlogDetails = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`)
            if (data?.success) {
                setBlog(data?.blog)
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBlogDetails();
    }, [id])



    const handleChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id
            })
            if (data?.success) {
                toast.success("Blog Post Updated Successfully");
                navigate("/my-blogs")
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box width={'50%'} border={3} borderRadius={10} padding={3} margin={'auto'} boxShadow={'10px 10px 20px #ccc'} display={'flex'} flexDirection={'column'} marginTop={'30px'}>
                    <Typography variant='h5' textAlign={'center'} fontWeight={"bold"} padding={3} color={'gray'}>
                        Edit Post
                    </Typography>
                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Title</InputLabel>
                    <TextField name='title' margin='normal' variant='outlined' value={inputs.title} onChange={handleChange} required />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Description</InputLabel>
                    <TextField name='description' margin='normal' variant='outlined' value={inputs.description} onChange={handleChange} required />

                    <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>Image URL</InputLabel>
                    <TextField name='image' margin='normal' variant='outlined' value={inputs.image} onChange={handleChange} required />

                    <Button type='submit' color='warning' variant='contained'>UPDATE</Button>
                </Box>
            </form >
        </>
    )
}

export default BlogDetails