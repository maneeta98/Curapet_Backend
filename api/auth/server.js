import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/curapet');

// User schema
const userSchema = new mongoose.Schema({ name:String, email:String, password:String });
const User = mongoose.model('User', userSchema);

// Register
app.post('/api/auth/register', async (req,res)=>{
  const {name,email,password}=req.body;
  const hashed = await bcrypt.hash(password,10);
  await User.create({name,email,password:hashed});
  res.json({message:"Registered"});
});

// Login
app.post('/api/auth/login', async (req,res)=>{
  const {email,password}=req.body;
  const user=await User.findOne({email});
  if(!user) return res.status(400).json({message:"Invalid"});
  const match=await bcrypt.compare(password,user.password);
  if(!match) return res.status(400).json({message:"Invalid"});
  const token=jwt.sign({id:user._id},'secret');
  res.json({token});
});

app.listen(5000,()=>console.log('Backend running on 5000'));

// const express = require('express');
// const app = express();
// const cors = require('cors');
// require('./config/db')();

// app.use(cors());
// app.use(express.json());

// app.use('/api/pets', require('./routes/pets'));
// app.use('/api/appointments', require('./routes/appointments'));

// module.exports = app;
