import React, { useState, useEffect } from 'react'
import axios from 'axios';
import BlogsCard from '../components/BlogsCard';
const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    const getAllblogs = async () => {
        try {
            const { data } = await axios.get('/api/v1/blog/all-blog')

            if (data?.success) {
                setBlogs(data?.blogs);
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllblogs();
    }, [])

    return (
        <div>
            {blogs && blogs.map((blog) => <BlogsCard
                id={blog?._id}
                isUser={localStorage.getItem("userId") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                username={blog?.user?.username}
                createdAt={blog?.createdAt}
            />)}

        </div>
    )
}

export default Blogs