import { User } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



export const signupUser = async (req, res) => {
	// console.log(req.body.password);
	try {
		const { username, email, password } = req.body
		let user = await User.findOne({ email })
		let uname = await User.findOne({ username })

		if (user){
			alert("user already exist")
			return res.status(400).json({ success: false, message: "User Already exist" })
		} 
		else if(uname) {
			alert("please choose another username")
			 return res.status(400).json({ success: false, message: "Please Choose Another Username" })
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		user = await User.create({ username, email, password: hashedPassword })

		res.json("User created successfully")

	} catch (error) {
		console.log(error);
		res.status(400).json(error)
	}
}

export const loginuser = async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ username })

		if (!user) {
			alert("Invalid username")
			return res.status(400).json({
			success: false,
			message: "Invalid username"
		})}

		const isMAtch = await bcrypt.compare(password, user.password)
		if (!isMAtch) {
			alert("Invalid password")
			return res.status(400).json({
			success: false,
			message: "Invalid password"
		})}

		jwt.sign({ username, id: user._id }, process.env.JWT_SECRET_KEY, {}, (err, token) => {
			if (err) throw err
			res.json({ message: `welcome back ${user.username}`, token: token, username: user.username })
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json(error)
	}
}


export const logout = (req, res) => {
	res.status(200).json({ message: `Logout Successfully`, token: '' })
}