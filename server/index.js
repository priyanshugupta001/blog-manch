<<<<<<< HEAD
import express from 'express' 	//Express is a popular web application framework for Node.js.
=======
import express, { Router } from 'express' 	//Express is a popular web application framework for Node.js.
>>>>>>> 83e7669d07b373b11b503b87911eb755074eb2b0
import cors from 'cors'						//CORS or Cross-Origin Resource Sharing in Node. js is a mechanism by which a front-end client can make requests for resources to an external back-end server.


// import { User } from './model/userModel.js'
// import bcrypt from 'bcrypt'

import bodyParser from 'body-parser'		//in order to read HTTP POST data , we have to use "body-parser" node module. body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body

import jwt from 'jsonwebtoken'				//JWTs are mainly used for authentication. After a user signs in to an application, the application then assigns JWT to that user. Subsequent requests by the user will include the assigned JWT. This token tells the server what routes, services, and resources the user is allowed to access.

import cookieParser from 'cookie-parser'	//In Node.js, cookieParser is a middleware commonly used with web applications to parse and handle HTTP cookies. Cookies are small pieces of data stored on the client-side by the web browser, and they are commonly used to store session information or user preferences.


import dotenv from 'dotenv'					//allows you to keep sensitive configuration data separate from your source code, making it easier to manage different configurations for different environments without hardcoding values in your codebase.



import { connectDb } from './db/database.js'
import userRouter from './routes/Route.js'

const app = express()						//This line creates an instance of the Express application, which is the central part of your web server.

dotenv.config()			//This line loads the environment variables from the .env file into process.env.
<<<<<<< HEAD



// middlerwares
app.use(express.json()) //This line is a middleware that parses incoming JSON data and makes it available in req.body.
app.use(bodyParser.json())	//Parses the text as JSON and exposes the resulting object on req.body.
app.use(cookieParser())	



// Below lines configure the CORS options for the server. It allows requests from the specified origin and includes credentials (cookies) in the CORS request.
const corsOptions = {
	credentials: true,
	// origin: 'https://blog-manch-frontend.vercel.app', // Allow requests from this specific origin
	origin: 'http://localhost:3000'
};
app.use(cors(corsOptions)); // Use the configured CORS options
  
=======

// middlerwares
app.use(express.json()) //This line is a middleware that parses incoming JSON data and makes it available in req.body.

// Below lines configure the CORS options for the server. It allows requests from the specified origin and includes credentials (cookies) in the CORS request.
const corsOptions = {
	credentials: true,
	origin: 'https://blog-manch-frontend.vercel.app', // Allow requests from this specific origin
	// origin: 'http://localhost:3000'
};
app.use(cors(corsOptions)); // Use the configured CORS options
  


app.use(bodyParser.json())	//Parses the text as JSON and exposes the resulting object on req.body.
app.use(cookieParser())	
>>>>>>> 83e7669d07b373b11b503b87911eb755074eb2b0

app.use('/', userRouter)	//This line attaches the userRouter middleware to the root path ('/') of the application. The userRouter is defined in another file and contains the route handlers for user-related endpoints.


connectDb()		//This line calls the connectDb function to establish a connection to the database.


//Below function is a route handler for the root path ('/'). When a GET request is made to the root path, it sends a JSON response with a success message.
app.get("/", (req, res) => {
	res.json({
		success: true,
		message: "worked",
	})
})


// Below function is a route handler for the '/profile' path. When a GET request is made to '/profile', it expects a JWT token in the cookies. It then verifies the token using the jsonwebtoken library with the specified secret key from the environment variables. If the token is valid, it sends the decoded data as a JSON response.
app.get("/profile", (req, res) => {
	const { token } = req.cookies
	console.log(token);
	jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, data) => 
				{
					if (err) throw err;
					res.json(data)
				})
})


// Below lines starts the server on port 5000, and a callback function is executed once the server starts listening. The callback function simply logs a message to the console indicating that the server is connected.
app.listen(5000, () => {
	console.log("Connected to server");
})




//  ************Summary*************
//  It sets up an Express web server with middleware for parsing JSON, cookies, and handling CORS. It also establishes a connection to the database and defines some routes for handling requests.