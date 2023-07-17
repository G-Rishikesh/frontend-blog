import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Box,Button, InputLabel, TextField, Typography } from '@mui/material'

const labelStyles={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'};
const BlogDetail = () => {
  const navigate=useNavigate();
  const [blog,setBlog]=useState();
  const id=useParams().id;
  const [inputs,setInputs]=useState({});

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  };
  const fetchDeatils=async()=>{
    const res=await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=>console.log(err));
    const data=res.data;
    return data;
  }
  useEffect(()=>{
    fetchDeatils().then(data=>{
      setBlog(data.blog);
      setInputs({title:data.blog.title,description:data.blog.description})
    });
  },[id]);

  // const sendRequest=async()=>{
  //   const res=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
  //     title:inputs.title,
  //     description:inputs.description
  //   }).catch(err=>console.log(err));

  //   const data=await res.data;
  //   return data;
  // };

  const sendRequest = async () => {
    let data = JSON.stringify({
        "title":inputs.title,
        "description": inputs.description,
    });
    console.log("data",data)
    console.log("id",blog._id)
    let config = {
        method: 'put',
        url: `http://localhost:5000/api/blog/update/${blog._id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    var res;
    return axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            res=response.data;
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
        // console.log('hello'+data);
    // return data;
};

console.log("blog is",blog);

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(data=>console.log(data)).then(()=>navigate("/myBlogs/"));
  }

  return (
    <div>{inputs &&
      <form onSubmit={handleSubmit}>
        <Box 
          border={3} 
          borderColor='linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 0%, rgba(0,212,255,1) 100%)' 
          borderRadius={10} 
          boxShadow="10px 10px 20px #ccc" 
          padding={3} 
          margin={'auto'} 
          marginTop={3}
          disply='flex' 
          flexDirection={'column'} 
          width={"80%"}
        >
          <Typography 
            fontWeight={'bold'}
            padding={3}
            color='grey'
            variant='h2'
            textAlign={'center'}
          >
            Post your blog
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField sx={{width:'100%'}} name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'/>
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField sx={{width:'100%'}} name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'/>
          <Typography display='block'></Typography>
          <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetail