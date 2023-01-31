const userModel = require('./usermodel');
const jwt = require("jsonwebtoken")


const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { Name, userName, password } = req.body
        if (!Name) {
            res.status(400).send({ status: false, message: "Name is require" })
        }
        if (!userName) {
            res.status(400).send({ status: false, message: "userName is require" })
        }
        if (!password) {
            res.status(400).send({ status: false, message: "password is require" })
        }
        const data = await userModel.create({ Name, userName, password })
        return res.status(201).send({ status: true, message: "Success", data });
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}



const login=async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName) {
            res.status(400).send({ status: false, message: "userName is require" })
        }
        if (!password) {
            res.status(400).send({ status: false, message: "password is require" })
        }
        let data =await userModel.findOne({ userName, password })
        if (!data) {
            res.status(404).send({ status: false, message: "User not Found" })
        }
        let token = jwt.sign(
            { userId: userName },
            "mySecKey",
            { expiresIn: '1d' }
        )
        return res.status(200).send({ status: true, message: "Success", data: { token:token,name:userName } });
    }
    catch (e) {
        res.status(500).send(e.message)
    }
}

module.exports={
    createUser,login
}