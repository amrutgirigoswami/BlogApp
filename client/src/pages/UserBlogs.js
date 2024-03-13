import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BlogsCard from '../components/BlogsCard';
const UserBlogs = () => {

    const [blogs, setBlogs] = useState([]);

    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`)
            if (data?.success) {
                setBlogs(data?.userBlog.blogs)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserBlogs();
    }, [])
    return (
        <>
            {blogs && blogs.length > 0 ? (blogs.map((blog) => (
                <BlogsCard
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={blog.user.username}
                    createdAt={blog.createdAt}
                />))) : (<h1>You haven't created blog</h1>)}
        </>
    )
}

export default UserBlogs