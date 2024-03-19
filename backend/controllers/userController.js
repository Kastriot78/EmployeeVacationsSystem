import User from '../Models/User.js';
import {
    getToken
} from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({
            _id: -1
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: error.message
        });
    }
}

export const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(400).send({
                error: `Emaili ${email} nuk ekziston!`
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                error: 'Fjalëkalimi gabim!'
            });
        }

        res.status(200).send({
            _id: user.id,
            name: user.name,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            isAdmin: user.isAdmin,
            token: getToken(user),
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.json(400).json({
            error: error.message
        });
    }
}

export const register = async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    });

    if (user) {
        return res.status(400).json({
            error: `Useri me emailin ${req.body.email} ekziston!`
        });
    }

    const newUser = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin ? JSON.parse(req.body.isAdmin) : false,
        createdAt: new Date().toISOString()
    });

    try {
        await newUser.save();
        res.send({
            _id: newUser._id,
            name: newUser.name,
            lastName: newUser.lastName,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            success: true,
            token: getToken(newUser)
        })
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        const deletedUser = await user.remove();
        res.status(200).send({
            message: 'Useri u fshi me sukses',
            data: deletedUser
        })
    } else {
        return res.status(500).send({
            message: 'Something went wrong,'
        })
    }
}