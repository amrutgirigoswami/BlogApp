import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast"
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function BlogsCard({ title, description, image, username, createdAt, id, isUser }) {

    const navigate = useNavigate();
    const handleEdit = () => {
        navigate(`/blog-details/${id}`)
    }
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`)
            if (data?.success) {
                toast.success("Post Deleted Successfully");
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Card sx={{ width: '50%', margin: 'auto', mt: 2, padding: 2, boxShadow: '5px 5px 10px #ccc', ":hover:": { boxShadow: '10px 10px 20px #ccc' } }}>
            {isUser && (
                <Box display={'flex'}>
                    <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
                        <ModeIcon color='info' />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {username}
                    </Avatar>
                }

                title={username}
                subheader={createdAt}
            />
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">

                </IconButton>
                <IconButton aria-label="share">

                </IconButton>

            </CardActions>

        </Card>
    );
}
