import express, { Router } from 'express'
import cors from 'cors'
import { User } from './model/userModel.js'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import  jwt  from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


import { connectDb } from './db/database.js'
import userRouter from './routes/Route.js'
const app = express()

dotenv.config()

// middlerwares
app.use(express.json())

const corsOptions = {
	credentials: true,
	origin: 'https://blog-manch-frontend.vercel.app' // Allow requests from this specific origin
	// origin: 'http://localhost:3000'
};
app.use(cors(corsOptions));


app.use(bodyParser.json())
app.use(cookieParser())
app.use('/', userRouter)


connectDb()


app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "worked",
	})
})


app.get("/profile", (req,res)=>{
	const {token} = req.cookies
	jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err,data)=>{
		if(err) throw err;
		res.json(data)
	})
	// res.json(req.cookies)
})

app.listen(5000, () => {
	console.log("Connected to server");
})