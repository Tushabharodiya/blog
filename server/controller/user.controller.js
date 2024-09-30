const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

let userRegister = async (req, res) => {
    try {
        let body = req.body;
        let { name, email, password, confirmpassword } = req.body;
        let findUser = await User.findOne({ email: email })

        if (findUser) {
            return res.status(401).json({ message: "you are alreay register" });
        }

        if (name.length <= 3) {
            return res.status(401).json({ message: "name must be at least 4 characters long" });
        }

        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(401).json({
                message: "Password must be at least 6 characters long and contain at least one special character"
            });
        }
        if (password !== confirmpassword) {
            return res.status(401).json({ message: "password invalid ! " });
        }
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds (default is 10)
        const hashedPassword = await bcrypt.hash(password, salt);

        body.password = hashedPassword;
        body.confirmpassword = hashedPassword;

        let user = await User.create(body);
        res.status(201).json({
            message: "user register success ",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


let userLogin = async (req, res) => {
    try {

        let { email, password, confirmpassword } = req.body;

        let user = await User.findOne({ email })

        if (!user) {
            throw new Error("user are not found");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        if (password !== confirmpassword) {
            return res.status(401).json({ message: "password invalid ! " });
        }

        let token = await jwt.sign({ user: user }, process.env.SECRET, { expiresIn: '1hr' })

        res.status(201).json({
            message: "user login success",
            user,
            token,
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { userRegister, userLogin }