import React, { useState } from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';
const Auth = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [isSignup,setIsSignup]=useState(false);
  const [inputs,setInputs]=useState({
    name:"",email:"",password:""
  });

  const handleChange=(e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }));
  };

  const sendRequest = async (type="login") => {
    let data = JSON.stringify({
        "name":inputs.name,
        "email": inputs.email,
        "password": inputs.password
    });

    let config = {
        method: 'post',
        url: `http://localhost:5000/api/user/${type}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    var res;
    return axios.request(config)
        .then((response) => {
            // console.log(JSON.stringify(response.data));
            res=response.data;
            return res;
        })
        .catch((error) => {
            console.log(error);
        });
        // console.log('hello'+data);
    // return data;
    
};

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(inputs);
    if(isSignup){
      sendRequest("signup")
        .then((data)=>{
          localStorage.setItem("userId",data.user._id);
          console.log(data.user_id);
        })
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then(data=>console.group(data));
    }
    else{
      sendRequest("login")
        .then((data)=>{localStorage.setItem("userId",data.user._id)
        console.log(data.user_id);
      })
        .then(()=>dispatch(authActions.login()))
        .then(()=>navigate("/blogs"))
        .then(data=>console.group(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box 
          maxWidth={400}
          display="flex"
          flexDirection={'column'} 
          alignItems='center' 
          justifyContent={'center'}
          boxShadow='10px 10px 20px #ccc'
          padding={3}
          margin='auto'
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign='center'>
            {isSignup?"Signup":"Login"}
          </Typography>
          {isSignup && (
            <TextField name="name" onChange={handleChange} value={inputs.name} placeholder='Name' margin="normal" />
          )}
          {" "}
          <TextField name="email" onChange={handleChange}
            type={'email'}
            value={inputs.email}
            placeholder='Email'
            margin="normal" 
          />
          <TextField name="password" onChange={handleChange}
            type={'password'}
            value={inputs.password} 
            placeholder='Password' 
            margin="normal" 
          />
          <Button type='submit'
            sx={{borderRadius:3,marginTop:3}} 
            variant='contained' 
            color="warning"
          >
            Submit
          </Button>
          <Button onClick={()=>setIsSignup(!isSignup)} sx={{borderRadius:3,marginTop:3}}>
            Change to {isSignup?"Login":"Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth