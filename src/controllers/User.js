const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors/')

const register = async(req, res) => {
    const user = await User.create({...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}
const login = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    // compare password
    const isPasswordCorrect = await User.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

const getAllUser = async(req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users })
}

const getUser = async(req, res) => {
    const userId = req.params.id
    const user = await User.findOne({ _id: userId })
    if (!user) {
        throw new NotFoundError(`Cant find user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const updateUser = async(req, res) => {
    const {
        body: { name, numberphone },
        params: { id: userId }
    } = req
    if (!name || !numberphone) {
        throw new BadRequestError('Infomation cannot be empty')
    }
    const user = await User.findOneAndUpdate({
            _id: userId,
        },
        req.body, {
            new: true,
            runValidators: true
        }
    )
    if (!user) {
        throw new NotFoundError(`No user with id: ${userId}`)
    }
    res.status(StatusCodes.OK).json({ user })
}

const deleteUser = async(req, res) => {
    const {
        params: { id: userId }
    } = req
    const user = await User.findOneAndRemove({ _id: userId })
    if (!user) {
        throw new NotFoundError(`No user with id ${userId}`)
    }
    res.status(StatusCodes.OK).json({ msg: `User with id: ${userId} has been deleted` })
}

module.exports = { register, login, getAllUser, getUser, updateUser, deleteUser }