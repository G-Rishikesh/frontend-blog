import React from 'react';
import axios from 'axios';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
  } from "@mui/material";
import {useNavigate} from 'react-router-dom';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ClassNames } from '@emotion/react';
import { useStyles } from './utils';

const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  const navigate=useNavigate();
  const classes=useStyles();
  // console.log("check",title)
  console.log("image ",imageURL);
  const handleEdit=(e)=>{
    console.log('here id',id)
    navigate(`/myBlogs/${id}`)
  }
  
  const deleteRequest=async()=>{
    const res=await axios.delete(`http://localhost:5000/api/blog/${id}`).catch(err=>console.log(err));
    const data=await res.data;
    return data;
  }

  const handleDelete=()=>{
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"));
  }
  return (
    <div>
      {" "}
      <Card sx={{ width:"40%",margin:'auto',mt:2,padding:2,boxShadow:"5px 5px 10px #ccc",
          ":hover": {
              boxShadow: "10px 10px 20px #ccc",
          },
          }}
      >
      {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}>
            <ModeEditOutlineIcon color='warning'/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteForeverIcon color='error'/>
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar className={classes.font} sx={{ bgcolor: 'red' }} aria-label="recipe">
            {userName}
          </Avatar>
        }
        title={title}
        // subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="img"
      />
      
      <CardContent>
      <hr />
      <br />
        <Typography className={classes.font} variant="body2" color="text.secondary">
          <b>{userName}</b>{":"}{description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default Blog