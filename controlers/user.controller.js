const { signupService, loginService, findUserByEmail } = require("../services/user.services")
const bcrypt = require('bcrypt');


exports.signup = async (req, res) => {
    try {
        const user = await signupService(req.body)

        res.status(200).json({
            status: "success",
            message: "Successfully signed up"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}

//check if email and password are given
//load user with email
//if not user send res
//compare password
//if password not correct send res
//check if user is active.
//if not active send res
//generate a token
//send user a token
//
exports.login = async (req, res) => {
    try {
        //finding email, pass
        const {email, password} = req.body;
        if(email || password){
            return res.status(401).json({
                status: 'fail',
                error:'Please provide your credential'
            })
        }
        const user = await findUserByEmail(email)

        //finding user from database
        if(!user){
            return res.status(401).json({
                status: "fail",
                error: "No user found, Please create an account"
            })
        }

        //matching the pass to the database pass
        const isPasswordValid = bcrypt

        res.status(200).json({
            status: "success",
            message: "Successfully logged in"
        })
    } catch (error) {
        res.status(500).json({
            status: "fail",
            error: error.message
        })
    }
}