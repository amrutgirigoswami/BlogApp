const userModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
exports.RegisterController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        if (!username || !email || !password) {
            return res.status(400).send({
                message: 'All Field is required',
                success: false
            })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                message: 'User already exists',
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new userModel({ username, email, password: hashedPassword })
        await user.save();

        return res.status(201).send({
            message: "New User Register Successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Erro in register Controller",
            success: false,
            error
        })
    }
};

exports.getAllUsers = async (req, res) => {
    try {

        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            message: "All user data fetched Successfully",
            success: true,
            users
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error in get all User code',
            success: false
        })
    }
};



exports.LoginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(401).send({
                message: "Please provide Email Or Password",
                success: false
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid Username or Password"
            })
        }

        return res.status(200).send({
            success: true,
            message: "Login Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in login callback",
            success: false,
            error
        })
    }
};